// https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
// The Firebase Admin SDK to access the Firebase Realtime Database.

// /** Firesbase */
// require('firebase');
require('firebase');
// const config = require('../_firebase.js').firebaseConfig;
// // admin.initializeApp(config);
// const firedb = admin.firestore();
// const serviceAccount = require('../galactic-storage-firebase-adminsdk-hvsjj-29f8ca05ab.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://galactic-storage.firebaseio.com'
// });
// const req.db = require('../server.js')
//  .get('admin').firestore();

// const userUtils = require('./utils.js');

/** Express */
// const expressImport = require('express');
// const expressEngine = expressImport();
const userRouter = require('express').Router();

/** Cors */
// const cors = require('cors');
// expressEngine.use(cors({ origin: true }));

// ────────────────────────────────────────────────────────────────────────────────
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// const afs = require('angularfire2/firestore').AngularFirestore;
// const usersCollection = afs.collection('users');
// res.json(usersCollection);
// ────────────────────────────────────────────────────────────────────────────────

userRouter.get('/', (req: any, res: any) => {
    console.log('users');
    req.db.collection('users').get()
        .then((collectionSnapshot: any) => {
            const docs = collectionSnapshot.docs.map((documentSnapshot: any) => documentSnapshot.data());
            res.status(res.statusCode).send(docs);
        })
        .catch((err: any) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

userRouter.post('/', (req: any, res: any) => {
    console.log('post user');
    const user = req.body;
    const id = req.body['id'];
    // console.log(req.body);
    // console.log(req.body.id);
    req.db.collection('users').doc(id).set(user)
        .then((documentSnapshot: any) => {
            console.log(documentSnapshot.data());
            res.status(res.statusCode).send(documentSnapshot.data());
        })
        .catch((err: any) => {
            res.status(res.statusCode).send(err);
        });
});

userRouter.get('/:id', (req: any, res: any) => {
    const id = req.params['id'];
    console.log('user');
    console.log(id);
    req.db.collection('users').doc(id).get()
        .then((documentSnapshot: any) => {
            console.log(documentSnapshot.data());
            res.status(res.statusCode).send(documentSnapshot.data());
        })
        .catch((err: any) => {
            res.status(res.statusCode).send(err);
        });
});

// todo ... issues differences between put / post
userRouter.post('/:id', (req: any, res: any) => {
    console.log('update user');
    const user = req.body;
    const userID = user.fbID;
    // console.log(user);
    // console.log(userID);
    req.db.collection('users')
        .doc(userID)
        .set(user, {merge: true})
        .then((documentSnapshot: any) => {
            console.log('user');
            console.log(user);
            // console.log('empty');
            // console.log(documentSnapshot);
            res.status(res.statusCode).send(user);
        })
        .catch((err: any) => {
            res.status(res.statusCode).send(err);
        });
});

userRouter.get('/pkeys/:pubkey', (req: any, res: any) => {
    const publicKey = req.params['pubkey'];
    req.db.collection('users')
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

userRouter.delete('/:id', (req: any, res: any) => {
    const id = req.params['id'];
    req.db.collection('users').doc(id).delete()
        .then((documentSnapshot: any) => {
            res.status(res.statusCode).send(res.statusCode);
        })
        .catch((err: any) => {
            res.status(res.statusCode).send(err);
        });
});

module.exports = userRouter;
