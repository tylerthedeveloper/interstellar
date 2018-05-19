"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const firebase_admin_1 = require("firebase-admin");
firebase_admin_1.initializeApp();
/** Express */
const expressImport = require("express");
const expressEngine = expressImport();
/** Networking Helpers */
const path = require('path');
// Root path
const root = './';
/** Cors */
const cors = require("cors");
expressEngine.use(cors({ origin: true }));
// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });
exports.showDocumentation = functions.https.onRequest((request, response) => {
    response.send(expressImport.static(path.join(root, 'documentation')));
});
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
    response.send(path('./'));
    response.send(path('../'));
    response.send(path('../../'));
    response.send(root);
});
exports.helloWorld2 = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
//# sourceMappingURL=index.js.map