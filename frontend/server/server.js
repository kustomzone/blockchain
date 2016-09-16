const express = require('express');
const serveStatic = require('serve-static');
const proxy = require('express-http-proxy');

const app = express();

// Serve static app
app.use(serveStatic('../static', {'index': ['index.html']}));

// Start server
const server = app.listen(8082, function() {
    console.log('Listening on port %d', server.address().port);
});

// var io = require('socket.io').listen(server);
//
// io.on('connection', function (socket) {
//   console.log("connected");
//   socket.emit("event", {event: "FooEvent", message: "A FooEvent was triggered"});
// });
