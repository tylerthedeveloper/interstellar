// https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

/** Express */
const expressImport = require("express")
const expressEngine = expressImport()

/** Cors */
const cors = require("cors")
expressEngine.use(cors({ origin: true }))

// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

export const showDocumentation = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

const userRouter = require('express').Router();

// Get users
const users = ['tito', 'jon-A'];

userRouter.get('/', (req, res) => {
    res.json(users);
});

module.exports = userRouter;
