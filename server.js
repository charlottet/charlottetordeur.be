#!/usr/bin/env node
var app = require('./app');

// Start the server.
var port = process.env.PORT || process.env.httpPort || 3000;
var ip = process.env.CHACHOU_SERVICE_HOST || '127.0.0.1';
app.listen(port, ip);
