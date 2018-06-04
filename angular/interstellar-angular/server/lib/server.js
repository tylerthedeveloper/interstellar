"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import everything from express and assign it to the express variable
const express = require("express");
// Create a new express application instance
const app = express();
// Import graphQL fore express
const graphqlHTTP = require('express-graphql');

const schema = require('./graphql/schema');

// The root provides a resolver function for each API endpoint
const root = {
    rollDice: function (args) {
        var output = [];
        for (var i = 0; i < args.numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
        }
        return output;
    }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
  
// The port the express app will listen on
const port = process.env.PORT || 4000;
/** Imports */
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/** Paths */
const rootPath = './'; // Root path
const api = require('./routes/api.js'); // API file
const docsPath = 'app/documentation'; // Docs Path
/** Firebase */
const firebase = require('firebase');
const admin = require('firebase-admin');
const angularFireStore = require('angularfire2/firestore').AngularFirestore;

// const serviceAccount = require('./galactic-storage-firebase-adminsdk-hvsjj-29f8ca05ab.json');
const serviceAccount = require('./_firebase.js');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://galactic-storage.firebaseio.com'
});
const firedb = admin.firestore();
/** Headers */
app.use(function (req, res, next) {
    req.db = res.db = firedb;
    req.afs = res.afs = angularFireStore;
    // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.append('Content-Type', 'application/json');
    next();
});
/** Setters */
app.use(express.static(path.join(rootPath, 'dist'))); // Angular DIST output folder
// app.use('/api', api.router); // API location
// app.use('/documentation', express.static(path.join(rootPath, 'documentation'))); // Docs location
app.set('admin', api.admin);
// app.set('firedb', api.firedb);
// Serve the application at the given port
app.listen(port, () => {
    // Success callbackw
    console.log(`Listening at http://localhost:${port}/`);
});
module.exports = app;
// new end comment 9
// https://stackoverflow.com/questions/42637794/how-to-pass-multiple-params-to-express-with-the-angularjs-service
// https://stackoverflow.com/questions/43575514/route-parameters-in-angular-2-and-express-api-get-single-post
// https://webapplog.com/intro-to-express-js-parameters-error-handling-and-other-middleware/
// https://stackoverflow.com/questions/37378050/how-to-get-and-set-data-to-firebase-with-node-js
// https://dev.to/briandgls/using-typescript-with-express--e0k
// https://firebase.google.com/docs/admin/setup#initialize_the_sdk
//# sourceMappingURL=server.js.map