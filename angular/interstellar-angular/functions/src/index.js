// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// Start writing Firebase Functions

/** Firebase */
// https://firebase.google.com/docs/functions/typescript
// import * as functions from 'firebase-functions';
import { https } from "firebase-functions";

// The Firebase Admin SDK to access the Firebase Realtime Database.
import { initializeApp } from "firebase-admin";
initializeApp();

/** Express */
import expressImport from "express";
const expressEngine = expressImport()

/** Cors */
import cors from "cors";

expressEngine.use(cors({ origin: true }))

// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

export const showDocumentation = https.onRequest((request, response) => {
    //response.send("Checkout the docs");
    expressEngine.static('../documentation')
});

/*
The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
*/