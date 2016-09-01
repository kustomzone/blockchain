const express = require('express');
const serveStatic = require('serve-static');
const proxy = require('express-http-proxy');

const app = express();

// Serve static app
app.use(serveStatic('../static', {'index': ['index.html']}));

// Start server
const server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});
