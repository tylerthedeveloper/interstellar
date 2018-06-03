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

// cartRouter.post('/', (req, res) => {
//     console.log('post cart');
//     const cart = req.body;
//     const cartID = cart['id'];
//     const cartCat = cart['cartCategory'];
//     const userID = cart['cartSellerData']['cartSellerID'];
//     const IDPackage = JSON.stringify({id: cartID})
//     const batch = req.db.batch();
//     batch.set(req.db.collection('carts').doc(cartID), cart);
//     batch.set(req.db.collection('users-carts').doc(userID).collection('carts').doc(cartID), cart);
//     batch.set(req.db.collection('carts-categories').doc(cartCat).collection('carts').doc(cartID), cart);
//     batch.commit().then(() => res.status(res.statusCode).send(IDPackage))
//         .catch((err) => res.status(res.statusCode).send(err));
// });


// cartRouter.get('/:cartID', (req, res) => {
//     console.log('get cart');    
//     const cartID = req.params['cartID'];
//     console.log(cartID);
//     req.db.collection('carts').doc(cartID).get()
//         .then((documentSnapshot) => {
//             // console.log(documentSnapshot.data());
//             res.status(res.statusCode).send(documentSnapshot.data());
//         })
//         .catch((err) => {
//             res.status(res.statusCode).send(err);
//         });
// });

// cartRouter.delete('/:cartID', (req, res) => {
//     console.log('delete cart');
//     const cartID = cart['id'];
//     const cartCat = cart['cartCategory'];
//     const userID = cart['cartSellerData']['cartSellerID'];
//     const IDPackage = JSON.stringify({id: cartID})
//     const batch = req.db.batch();
//     batch.delete(req.db.collection('carts').doc(cartID));
//     batch.delete(req.db.collection('users-carts').doc(userID).collection('carts').doc(cartID));
//     batch.delete(req.db.collection('carts-categories').doc(cartCat).collection('carts').doc(cartID));
//     batch.commit()
//         .then(() => res.status(res.statusCode).send(IDPackage))
//         .catch((err) => res.status(res.statusCode).send(err));
// });

// // FIXME: CHANGE TO USER-PRODUCTS
// cartRouter.get('/user-carts/:userID', (req, res) => {
//     console.log('get user carts');
//     const userID = req.params['userID'];
//     console.log(userID);
//     req.db.collection('users-carts').doc(userID).collection('carts').get()
//         .then((collectionSnapshot) => {
//             console.log('user carts on server')
//             const docs = collectionSnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
//             res.status(res.statusCode).send(docs);
//         })
//         .catch((err) => {
//             res.status(res.statusCode).json({ error: err.toString() });
//         });
// });

// // FIXME: CHANGE TO PRODUCT-CATEGORIES AND MOVE TO CATEGORY route
// cartRouter.get('/categories/:category', (req, res) => {
//     console.log('get user carts categories');
//     const category = req.params['category'];
//     console.log(category);
//     req.db.collection('carts-categories').doc(category).collection('carts').get()
//         .then((collectionSnapshot) => {
//             const docs = collectionSnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
//             // console.log(docs)
//             res.status(res.statusCode).send(docs);
//         })
//         .catch((err) => {
//             res.status(res.statusCode).json({ error: err.toString() });
//         });
// });

// cartRouter.delete('/:id', (req: any, res: any) => {
//     const id = req.params['id'];
//     firedb.collection('carts').doc(id).delete()
//         .then((documentSnapshot: any) => {
//             res.status(res.statusCode).send(res.statusCode);
//         })
//         .catch((err: any) => {
//             res.status(res.statusCode).send(err);
//         });
// });
module.exports = cartRouter;
//# sourceMappingURL=carts.js.map