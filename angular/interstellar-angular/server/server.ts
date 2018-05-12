/* app/server.ts */

// Import everything from express and assign it to the express variable
import * as express from 'express';


// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port: number = process.env.PORT || 3000;

/** Imports */
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

/** Paths */
const root = './'; // Root path
const api = require('./routes/api.ts'); // API file
const docsPath = 'app/documentation'; // Docs Path


// Headers
app.use(function(req, res, next) {
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
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
