import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access the Firebase Realtime Database.
import { initializeApp } from "firebase-admin";
initializeApp();

/** Express */
import * as expressImport from 'express';
const expressEngine = expressImport()


/** Networking Helpers */
const path = require('path');
// Root path
const root = './';
/** Cors */
import * as cors from "cors";
expressEngine.use(cors({ origin: true }))

// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

expressEngine.use('/documentation', expressImport.static(path.join(root, 'documentation')))

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
 response.send(root);
});

export const helloWorld2 = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
   });
   

//Set Port
const http = require('http');
const server = http.createServer(expressEngine);
const port = process.env.PORT || '3000';
expressEngine.set('port', port);
server.listen(port, () => console.log(`Running on localhost:${port}`));