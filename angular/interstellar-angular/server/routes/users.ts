// https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
// The Firebase Admin SDK to access the Firebase Realtime Database.
const firebase = require('firebase');
const admin = require('firebase-admin');
const config = require('../_firebase.js').firebaseConfig;
firebase.initializeApp(config);



// const functions = require('firebase-functions');

const userUtils = require('./utils.js');

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
// res.json(usersCollection);



const request = require('request');
const FbObj = require('../models/fb.object.js');

userRouter.get('/', (req: any, res: any) => {
    // console.log(users);
    // res.json(userRouter.get('https://firestore.googleapis.com/v1beta1/projects/galactic-storage/databases/(default)/documents/users'))
    // res.json(usersCollection);
    request(`${userUtils.firebaseDbURL}/users/.json`, function (error: any, response: any, body: any) {
      console.log(body)
      console.log('error:', error); // Print the error if one occurred and handle it
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      const arr = JSON.parse(body);
      const docs: Array<FbObject> = arr['documents'];
      const _users = docs.map(doc => {
        // console.log(doc.fields)
          const _doc = JSON.stringify(doc);
          console.log(doc.fields + '\n')
          console.log('\n')
          // console.log('\n')
          // console.log(doc.fields)
          return doc.fields;
      });
      // console.log(_users)
      res.send(_users);
    });
});

module.exports = userRouter;
