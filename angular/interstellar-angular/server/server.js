"use strict";
/* app/server.ts */
exports.__esModule = true;
// Import everything from express and assign it to the express variable
var express = require("express");
// Create a new express application instance
var app = express();
// The port the express app will listen on
var port = process.env.PORT || 3000;
/** Imports */
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
/** Paths */
var root = './'; // Root path
var api = require('./routes/api.js'); // API file
var docsPath = 'app/documentation'; // Docs Path
// Headers
app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
/** Setters */
app.use(express.static(path.join(root, 'dist'))); // Angular DIST output folder
app.use('/api', api); // API location
app.use('/documentation', express.static(path.join(root, 'documentation'))); // Docs location
// Serve the application at the given port
app.listen(port, function () {
    // Success callback
    console.log("Listening at http://localhost:" + port + "/");
});
// new end comment 55
