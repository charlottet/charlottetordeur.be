#!/usr/bin/env node
var app = require('./app');

// Start the server.
var port = process.env.CHACHOU_SERVICE_PORT || 8080;
var ip = process.env.CHACHOU_SERVICE_HOST || '127.0.0.1';
app.listen(port, ip);
