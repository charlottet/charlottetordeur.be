#!/usr/bin/env node
var app = require('./app');

// Start the server.
var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Node app is running on port', app.get('port'));
});
