"use strict";
// https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
require('firebase');
const userRouter = require('express').Router();
userRouter.get('/', (req, res) => {
    console.log('users');
    req.db.collection('users').get()
        .then((collectionSnapshot) => {
        const docs = collectionSnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
        res.status(res.statusCode).send(docs);
    })
        .catch((err) => {
        res.status(res.statusCode).json({ error: err.toString() });
    });
});

userRouter.post('/', (req, res) => {
    console.log('post user');
    const user = req.body;
    const id = req.body['id'];
    // console.log(req.body);
    // console.log(req.body.id);
    req.db.collection('users').doc(id).set(user)
        .then((documentSnapshot) => {
            // console.log(documentSnapshot.data());
            res.status(res.statusCode).send(documentSnapshot.data());
        })
        .catch((err) => {
            res.status(res.statusCode).send(err);
        });
});

userRouter.get('/:id', (req, res) => {
    const id = req.params['id'];
    console.log('user');
    console.log(id);
    req.db.collection('users').doc(id).get()
        .then((documentSnapshot) => {
            // console.log(documentSnapshot.data());
            res.status(res.statusCode).send(documentSnapshot.data());
        })
        .catch((err) => {
            res.status(res.statusCode).send(err);
        });
});

// todo ... issues differences between put / post
userRouter.post('/:id', (req, res) => {
    console.log('update user');
    const user = req.body;
    const userID = user.fbID;
    // console.log(user);
    // console.log(userID);
    req.db.collection('users')
        .doc(userID)
        .set(user, { merge: true })
        .then((documentSnapshot) => {
        console.log('user');
        console.log(user);
        res.status(res.statusCode).send(user);
    })
        .catch((err) => {
        res.status(res.statusCode).send(err);
    });
});

userRouter.get('/pkeys/:pubkey', (req, res) => {
    const publicKey = req.params['pubkey'];
    req.db.collection('users')
        .where('publicKey', '==', publicKey)
        .get()
        .then((QuerySnapshot) => {
        const userSnapShot = QuerySnapshot.docs[0].data();
        res.status(res.statusCode).send(userSnapShot);
    })
        .catch((err) => {
        res.status(res.statusCode).send(err);
    });
});

userRouter.delete('/:id', (req, res) => {
    const id = req.params['id'];
    req.db.collection('users').doc(id).delete()
        .then((documentSnapshot) => {
        res.status(res.statusCode).send(res.statusCode);
    })
        .catch((err) => {
        res.status(res.statusCode).send(err);
    });
});

module.exports = userRouter;
//# sourceMappingURL=users.js.map