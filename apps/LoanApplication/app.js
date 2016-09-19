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

var jsonMockUrl = process.env.IDI_MOCK_HOST || 'localhost';
var jsonMockPort = process.env.IDI_MOCK_PORT || '8081';

var io = require('socket.io').listen(server);

// Event subscription functions
idisContract.ScoreFinished(startCallback, eventCallback);
idisContract.GetCreditScore(startCallback, eventCallback);
function startCallback ( error, eventSub ) { // This function is run for every event subscription when application starts
  // If this function is ommited, only the first eventCallback will fire
  //console.log('Start callback: ' + eventSub.getEventId());
}
function eventCallback ( error, event ) { // This function is run when event is triggered
  console.log('Event callback: ' + event.event);
  if ( event.event == 'GetCreditScore' ) {
    console.log('Getting credit score for ssn: ' + event.args.ssn);
    io.emit("event", {event: event.event, message: "Getting score for " + event.args.ssn});
    getAndSetCreditScore(event.args.ssn);
  } else if ( event.event == 'ScoreFinished' ) {
    io.emit("event", {event: event.event, message: "Score finished: " + event.args.score, score: event.args.score, manual: event.args.isManualProcessNeeded});
    console.log('Score: ' + event.args.score + ', Has green score: ' + event.args.hasGreenScore + ', Manual proccessing needed: ' + event.args.isManualProcessNeeded);
  }
}

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
        }
        if ( value.ssn && value.firstname && value.lastname ) {
          response.statusCode = setPersonalia(value.ssn, value.firstname, value.lastname) ? 500 : 200;
        }
        if ( response.statusCode === 500 ) {
          response.end();
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

io.on('connection', function (socket) {
  console.log("Client connected");
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

function getAndSetCreditScore ( ssn ) {
  var options = {
    host: jsonMockUrl,
    port: jsonMockPort,
    path: '/users/' + ssn,
    method: 'GET'
  };
  http.request(options, function (res) {
    var body = '';
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      //console.log('Body:' + body);
      var value = JSON.parse(body);
      setScore(value.credit_score);
    });
  }).end();
}

// Tell the server to listen to incoming requests on the port specified in the
// environment.
var idi_port = process.env.IDI_PORT || 1338;
server.listen(idi_port, function () {
  console.log('Listening for HTTP requests on port ' + idi_port + '.')
});
