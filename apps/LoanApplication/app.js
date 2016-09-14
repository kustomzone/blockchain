'use strict';

var contracts = require('eris-contracts');
var fs = require('fs');
var http = require('http');
var url = require('url');
var address = require('./epm.json').contract;
var abi = JSON.parse(fs.readFileSync('./abi/' + address, 'utf8'));
var accounts = require('./accounts.json');
var chainUrl;
var manager;
var contract;
var server;

chainUrl = 'http://localhost:1337/rpc';

// Instantiate the contract object manager using the chain URL and the account
// data.
manager = contracts.newContractManagerDev(chainUrl,accounts.simplechain_full_000);

// Instantiate the contract object using the ABI and the address.
contract = manager.newContractFactory(abi).at(address);

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
        contract.getSSN(function (error, result) {
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
        contract.getScore(function (error, result) {
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
          console.log("Received request to set score to " + value.score + '.');

          // Set the value in the contract.
          contract.setScore(parseInt(value.score), function (error) {
            response.statusCode = error ? 500 : 200;
            response.end();
          })
        }
        if ( value.ssn && value.firstname && value.lastname ) {
          console.log("Received request to set personalia: " + value.ssn + ", " + value.firstname + ", " + value.lastname);

          // Set the value in the contract.
          contract.setPersonalia(value.ssn, value.firstname, value.lastname, function (error) {
            response.statusCode = error ? 500 : 200;
            response.end();
          })
        }
      });

      break;

    default:
      response.statusCode = 501;
      response.end();
  }
});

// Tell the server to listen to incoming requests on the port specified in the
// environment.
var idi_port = process.env.IDI_PORT || 1338;
server.listen(idi_port, function () {
  console.log('Listening for HTTP requests on port ' + idi_port + '.')
});
