// TODO: "use strict" ...?

/** Imports */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express(); // Express app engine

/** Paths */
const root = './'; // Root path
const api = require('./routes/api.ts'); // API file 
const docsPath = 'app/documentation'; // Docs Path 

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Headers
app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

/** Setters */
app.use(express.static(path.join(root, 'dist'))); // Angular DIST output folder
app.use('/api', api); // API location
app.use('/documentation', express.static(path.join(root, 'documentation'))) // Docs location


// Send all other requests to the Angular app
app.get('*', (req, res) => {
    // res.sendFile(path.join('../', 'dist/index.html'));
    res.sendFile('dist/index.html', {"root": root});
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));