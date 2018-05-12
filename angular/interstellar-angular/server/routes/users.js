// https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
const functions = require('firebase-functions');

const utils = require('./utils.js')

/** Express */
const expressImport = require('express');
const expressEngine = expressImport();

/** Cors */
const cors = require('cors');
expressEngine.use(cors({ origin: true }));

// const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });
// const showDocumentation = functions.https.onCall((request, response) => {
//     response.json("Hello from Firebase!");
// });

const userRouter = require('express').Router();

// Get users
const users = ['tito', 'jon-A'];
// userRouter.get('/', (req, res) => {
//     res.json(users);
// });

// ────────────────────────────────────────────────────────────────────────────────
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// const afs = require('angularfire2/firestore').AngularFirestore;
// const usersCollection = afs.collection('users');
const request = require('request');

userRouter.get('/', (req, res) => {
    console.log(users);
    // res.json(userRouter.get('https://firestore.googleapis.com/v1beta1/projects/galactic-storage/databases/(default)/documents/users'))
    // res.json(usersCollection);
    request(`${utils.firebaseDbURL}/users`, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred and handle it
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      res.send(body)
    });
});


module.exports = userRouter;
