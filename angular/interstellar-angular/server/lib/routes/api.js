"use strict";
// https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
/** express */
const express = require('express');
const router = express.Router();
/** Helpers */
// const sendError = require('./utils.js').sendError;
// const response = require('./utils.js').response;
/** Firebase */
// firebase Connect ...
// todo: wtf is clousre
// const connection = (closure) => {
//     return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
//         if (err) return console.log(err);
//         closure(db);
//     });
// };
// const firebase = require('firebase');
// const admin = require('firebase-admin');
// const serviceAccount = require('../galactic-storage-firebase-adminsdk-hvsjj-29f8ca05ab.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://galactic-storage.firebaseio.com'
// });
// // const db = admin.firestore();
// // const firedb = require('firebase').db;
// const firedb = admin.firestore();
const userUtils = require('./utils.js');
/** Express */
const expressImport = require('express');
const expressEngine = expressImport();
/** Cors */
const cors = require('cors');
expressEngine.use(cors({ origin: true }));
/** Import Routes */
const cartRoute = require('./cart.js');
const chatRoute = require('./chat.js');
const usersRoute = require('./users.js');
const productsRoute = require('./products.js');
/** Assign Routes */
router.use('/cart', cartRoute);
router.use('/chat', chatRoute);
router.use('/products', productsRoute);
router.use('/users', usersRoute);
/** Exports */
const exporter = {
    router: router,
    // admin: admin,
    // firedb: firedb,
    expressEngine: expressEngine,
};
module.exports = exporter;
//# sourceMappingURL=api.js.map