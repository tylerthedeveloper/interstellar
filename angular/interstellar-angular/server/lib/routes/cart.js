"use strict";

/** Firesbase */
require('firebase');

const cartRouter = require('express').Router();

// todo: send as json from here
cartRouter.get('/:userID', (req, res) => {
    console.log('all carts on server')
    const userID = req.params['userID'];
    req.db.collection('user-cart').doc(userID).collection('cartItems').get()
        .then((collectionSnapshot) => {
            const docs = collectionSnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
            res.status(res.statusCode).send(docs);
        })
        .catch((err) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

// todo:
cartRouter.delete('/:userID', (req, res) => {
    console.log('empty cart');
    const userID = req.params['userID'];
    const cartItemID = req.params['cartItemID'];
    const IDPackage = JSON.stringify({id: cartItemID})
    req.db.collection('user-cart').doc(userID).collection('cartItems').doc(cartItemID).delete()
        .then(() => res.status(res.statusCode).send(IDPackage))
        .catch((err) => res.status(restatusCode).send(err));
});

cartRouter.post('/:userID', (req, res) => {
    console.log('add to cart')
    const userID = req.params['userID'];
    const cartItem = req.body;
    const cartItemID = cartItem['cartItemID'];
    req.db.collection('user-cart')
        .doc(userID)
        .collection('cartItems')
        .doc(cartItemID)
        .set(cartItem)
        .then((collectionSnapshot) => {
            console.log('added to cart');
            const IDPackage = JSON.stringify({id: cartItemID})
            console.log(IDPackage);
            res.status(res.statusCode).send(IDPackage);
        })
        .catch((err) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

cartRouter.delete('/:userID/:cartItemID', (req, res) => {
    console.log('delete cart item');
    const userID = req.params['userID'];
    const cartItemID = req.params['cartItemID'];
    const IDPackage = JSON.stringify({id: cartItemID})
    req.db.collection('user-cart').doc(userID).collection('cartItems').doc(cartItemID).delete()
        .then(() => res.status(res.statusCode).send(IDPackage))
        .catch((err) => res.status(restatusCode).send(err));
});

module.exports = cartRouter;
//# sourceMappingURL=carts.js.map