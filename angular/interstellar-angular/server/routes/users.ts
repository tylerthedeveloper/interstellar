// https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
// The Firebase Admin SDK to access the Firebase Realtime Database.
/** Firesbase */
const firebase = require('firebase');
const admin = require('firebase-admin');
const config = require('../_firebase.js').firebaseConfig;
// admin.initializeApp(config);

const serviceAccount = require('../galactic-storage-firebase-adminsdk-hvsjj-29f8ca05ab.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://galactic-storage.firebaseio.com'
  });

const db = admin.firestore();


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
const afs = require('angularfire2/firestore').AngularFirestore;
// const usersCollection = afs.collection('users');
// res.json(usersCollection);



// const request = require('request');
// const FbObj = require('../models/fb.object.js');


// const Firestore = require('@google-cloud/firestore');
// const firestore = new Firestore({
//   projectId: 'galactic-storage',
//   keyFilename: '/path/to/keyfile.json',
// });

// require("firebase/firestore");
// firebase.initializeApp({
//   apiKey: 'AIzaSyBthCwhwO2SHLFMaY_V2aFIMJxRC23QFpI',
//   authDomain: 'galactic-storage.firebaseapp.com',
//   projectId: 'galactic-storage'
// });

// const db = firebase.firestore(config);

userRouter.get('/', (req: any, res: any) => {
    console.log('without user id')
    console.log(req.params)
    db.collection('users').get()
    .then((snapshot: any) => {
        const docs = snapshot.docs.map((documentSnapshot: any) => documentSnapshot.data());
        res.send(docs);
    })
    .catch((err: any) => {
        console.log('Error getting documents', err);
    });
});

userRouter.get('/:id', (req: any, res: any) => {
    console.log('wiyth id')
    console.log(req.params)
    db.collection('users').get()
        .then((snapshot: any) => {
            const docs = snapshot.docs.map((documentSnapshot: any) => documentSnapshot.data());
            res.send(docs);
        })
        .catch((err: any) => {
        console.log('Error getting documents', err);
        });
});

// userRouter.get('/', (req: any, res: any) => {
//     // console.log(users);
//     // res.json(userRouter.get('https://firestore.googleapis.com/v1beta1/projects/galactic-storage/databases/(default)/documents/users'))
//     // res.json(usersCollection);
//     request(`${userUtils.firebaseDbURL}/users/.json`, function (error: any, response: any, body: any) {
//       console.log(body)
//       console.log('error:', error); // Print the error if one occurred and handle it
//       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//       const arr = JSON.parse(body);
//       const docs: Array<FbObject> = arr['documents'];
//       const _users = docs.map(doc => {
//         // console.log(doc.fields)
//           const _doc = JSON.stringify(doc);
//           console.log(doc.fields + '\n')
//           console.log('\n')
//           // console.log('\n')
//           // console.log(doc.fields)
//           return doc.fields;
//       });
//       // console.log(_users)
//       res.send(_users);
//     });
// });

module.exports = userRouter;
