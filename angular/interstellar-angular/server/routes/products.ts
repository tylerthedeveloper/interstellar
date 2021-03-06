// // https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
// // The Firebase Admin SDK to access the Firebase Realtime Database.

// // /** Firesbase */
// // require('firebase');
// // const firebase = require('firebase');
// // const admin = require('firebase-admin');
// // const config = require('../_firebase.js').firebaseConfig;
// // admin.initializeApp(config);
// // const serviceAccount = require('../galactic-storage-firebase-adminsdk-hvsjj-29f8ca05ab.json');
// // admin.initializeApp({
// //     credential: admin.credential.cert(serviceAccount),
// //     databaseURL: 'https://galactic-storage.firebaseio.com'
// // });
// // const db = admin.firestore();
// // const firedb = require('firebase').db;
// // const firedb = admin.firestore();

// // const userUtils = require('./utils.js');

// /** Express */
// // const expressImport = require('express');
// // const expressEngine = expressImport();
// const productRouter = require('express').Router();

// /** Cors */
// // const cors = require('cors');
// // expressEngine.use(cors({ origin: true }));

// // ────────────────────────────────────────────────────────────────────────────────
// // import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// // const afs = require('angularfire2/firestore').AngularFirestore;
// // const usersCollection = afs.collection('users');
// // res.json(usersCollection);
// // ────────────────────────────────────────────────────────────────────────────────

// productRouter.get('/', (req: any, res: any) => {
//     firedb.collection('products').get()
//         .then((collectionSnapshot: any) => {
//             const docs = collectionSnapshot.docs.map((documentSnapshot: any) => documentSnapshot.data());
//             res.status(res.statusCode).send(docs);
//         })
//         .catch((err: any) => {
//             res.status(res.statusCode).json({ error: err.toString() });
//         });
// });

// productRouter.post('/', (req: any, res: any) => {
//     console.log('post products');
//     const user = req.body;
//     const id = req.body['id'];
//     // console.log(req.body);
//     // console.log(req.body.id);
//     firedb.collection('products').doc(id).set(user)
//         .then((documentSnapshot: any) => {
//             console.log(documentSnapshot.data());
//             res.status(res.statusCode).send(documentSnapshot.data());
//         })
//         .catch((err: any) => {
//             res.status(res.statusCode).send(err);
//         });
// });

// productRouter.get('/:id', (req: any, res: any) => {
//     const id = req.params['id'];
//     firedb.collection('products').doc(id).get()
//         .then((documentSnapshot: any) => {
//             console.log(documentSnapshot.data());
//             res.status(res.statusCode).send(documentSnapshot.data());
//         })
//         .catch((err: any) => {
//             res.status(res.statusCode).send(err);
//         });
// });

// // todo ... issues differences between put / post
// productRouter.post('/:id', (req: any, res: any) => {
//     console.log('update user');
//     const user = req.body;
//     const userID = user.fbID;
//     // console.log(user);
//     // console.log(userID);
//     firedb.collection('products')
//         .doc(userID)
//         .set(user, {merge: true})
//         .then((documentSnapshot: any) => {
//             console.log('products');
//             console.log(user);
//             // console.log('empty');
//             // console.log(documentSnapshot);
//             res.status(res.statusCode).send(user);
//         })
//         .catch((err: any) => {
//             res.status(res.statusCode).send(err);
//         });
// });

// // productRouter.get('/pkeys/:pubkey', (req: any, res: any) => {
// //     const publicKey = req.params['pubkey'];
// //     firedb.collection('products')
// //         .where('publicKey', '==', publicKey)
// //         .get()
// //         .then((QuerySnapshot: any) => {
// //             const userSnapShot = QuerySnapshot.docs[0].data();
// //             res.status(res.statusCode).send(userSnapShot);
// //         })
// //         .catch((err: any) => {
// //             res.status(res.statusCode).send(err);
// //         });
// // });

// productRouter.delete('/:id', (req: any, res: any) => {
//     const id = req.params['id'];
//     firedb.collection('products').doc(id).delete()
//         .then((documentSnapshot: any) => {
//             res.status(res.statusCode).send(res.statusCode);
//         })
//         .catch((err: any) => {
//             res.status(res.statusCode).send(err);
//         });
// });

// module.exports = productRouter;
