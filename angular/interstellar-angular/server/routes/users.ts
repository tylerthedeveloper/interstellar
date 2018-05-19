// https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
// The Firebase Admin SDK to access the Firebase Realtime Database.

// /** Firesbase */
// require('firebase');
const firebase = require('firebase');
const admin = require('firebase-admin');
// const config = require('../_firebase.js').firebaseConfig;
// // admin.initializeApp(config);
const serviceAccount = require('../galactic-storage-firebase-adminsdk-hvsjj-29f8ca05ab.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://galactic-storage.firebaseio.com'
});
// const db = admin.firestore();
// const firedb = require('firebase').db;
const firedb = admin.firestore();

const userUtils = require('./utils.js');

/** Express */
const expressImport = require('express');
const expressEngine = expressImport();
const userRouter = require('express').Router();

/** Cors */
const cors = require('cors');
expressEngine.use(cors({ origin: true }));

// ────────────────────────────────────────────────────────────────────────────────
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// const afs = require('angularfire2/firestore').AngularFirestore;
// const usersCollection = afs.collection('users');
// res.json(usersCollection);
// ────────────────────────────────────────────────────────────────────────────────

userRouter.get('/', (req: any, res: any) => {
    firedb.collection('users').get()
        .then((collectionSnapshot: any) => {
            const docs = collectionSnapshot.docs.map((documentSnapshot: any) => documentSnapshot.data());
            res.status(res.statusCode).send(docs);
        })
        .catch((err: any) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

userRouter.get('/:id', (req: any, res: any) => {
    const id = req.params['id'];
    firedb.collection('users').doc(id).get()
        .then((documentSnapshot: any) => {
            console.log(documentSnapshot.data());
            res.status(res.statusCode).send(documentSnapshot.data());
        })
        .catch((err: any) => {
            res.status(res.statusCode).send(err);
        });
});

userRouter.get('/pkeys/:pubkey', (req: any, res: any) => {
    const publicKey = req.params['pubkey'];
    firedb.collection('users')
        .where('publicKey', '==', publicKey)
        .get()
        .then((QuerySnapshot: any) => {
            const userSnapShot = QuerySnapshot.docs[0].data();
            res.status(res.statusCode).send(userSnapShot);
        })
        .catch((err: any) => {
            res.status(res.statusCode).send(err);
        });
});


userRouter.post('/', (req: any, res: any) => {
    console.log('post user');
    const user = req.body;
    const id = req.body['id'];
    // console.log(req.body);
    // console.log(req.body.id);
    firedb.collection('users').doc(id).set(user)
        .then((documentSnapshot: any) => {
            console.log(documentSnapshot.data());
            res.status(res.statusCode).send(documentSnapshot.data());
        })
        .catch((err: any) => {
            res.status(res.statusCode).send(err);
        });
});

userRouter.delete('/:id', (req: any, res: any) => {
    const id = req.params['id'];
    firedb.collection('users').doc(id).delete()
        .then((documentSnapshot: any) => {
            res.status(res.statusCode).send(res.statusCode);
        })
        .catch((err: any) => {
            res.status(res.statusCode).send(err);
        });
});

module.exports = userRouter;
