'use strict';

var erisC = require('eris-contracts');
var fs = require('fs');
var http = require('http');
var url = require('url');

var erisdbURL = "http://localhost:1337/rpc";
var contractData = require('./epm.json');
var idisContractAddress = contractData["contract"];
var idisAbi = JSON.parse(fs.readFileSync("./abi/" + idisContractAddress));
var accountData = require('./accounts.json');
var contractsManager = erisC.newContractManagerDev(erisdbURL, accountData.simplechain_full_000);
var idisContract = contractsManager.newContractFactory(idisAbi).at(idisContractAddress);
var server;

// Create an HTTP server.
server = http.createServer(function (request, response) {
  var body;
  var value;

  switch (request.method) {
    case 'GET':
      if (request.url === "/favicon.ico") {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>');
        response.end();
        break;
      }
      var parts = url.parse(request.url, true);
      var query = parts.query;

      if ( query.field && query.field == 'ssn' ) {
        console.log("Received request to get ssn.");
        idisContract.getSSN(function (error, result) {
           if (error) {
            response.statusCode = 500;
            console.error(error);
          } else {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.write(result);
          }

          response.end('\n');
          
        });
      }
      else {
        console.log("Received request to get score.");
        // Get the value from the contract and return it to the HTTP client.
        idisContract.getScore(function (error, result) {
          if (error) {
            response.statusCode = 500;
            console.error(error);
          } else {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.write(JSON.stringify(result['c'][0]));
          }

          response.end('\n');
        });
       
      }


      break;

    case 'POST':
      body = '';

      request.on('data', function (chunk) {
        body += chunk;
      });


      request.on('end', function () {
        value = JSON.parse(body);
        if ( value.score ) {
          response.statusCode = setScore(value.score) ? 500 : 200;
        }
        if ( response.statusCode === 500 ) {
          response.end();
          break;
        }
        if ( value.ssn && value.firstname && value.lastname ) {
          response.statusCode = setPersonalia(value.ssn, value.firstname, value.lastname) ? 500 : 200;
        }
        if ( response.statusCode === 500 ) {
          response.end();
          break;
        }
        if ( value.amount && value.maturity && value.interest ) {
          response.statusCode = setLoan(value.amount, value.maturity, value.interest) ? 500 : 200;
        }
        response.end();
      });

      break;

    default:
      response.statusCode = 501;
      response.end();
  }
});

function setScore ( score ) {
  console.log("Received request to set score to " + score + '.');
  // Set the value in the contract.
  idisContract.setScore(score, function (error) {
    return error;
  })
}

function setPersonalia ( ssn, firstName, lastName ) {
  console.log("Received request to set personalia: " + ssn + ", " + firstName + ", " + lastName);
  // Set the value in the contract.
  idisContract.setPersonalia(ssn, firstName, lastName, function (error) {
    return error;
  });
}

function setLoan ( amount, maturity, interest ) {
  console.log("Received request to set loan: " + amount + ", " + maturity + ", " + interest);
  // Set the value in the contract.
  idisContract.setLoan(amount, maturity, interest, function (error) {
    return error;
  });
}


// Tell the server to listen to incoming requests on the port specified in the
// environment.
var idi_port = process.env.IDI_PORT || 1338;
server.listen(idi_port, function () {
  console.log('Listening for HTTP requests on port ' + idi_port + '.')
});
