// TODO: "use strict" ...?

const express = require('express');
// import * as express from 'express';

const bodyParser = require('body-parser');
// import * as bodyParser from 'body-parser';

const path = require('path');
// import * as path from 'path';

const http = require('http');
// import * as http from 'http';

// Express app engine
const app = express();

// Root path
const root = './';

// API file 
const api = require('./routes/api.js');
// import * as api from './routes/api';

// Docs Path 
const docsPath = 'app/documentation';
// import * as api from './routes/api';

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(root, 'dist')));

// API location
app.use('/api', api);

// Docs location
app.use('/documentation', express.static(path.join(root, 'documentation')))


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