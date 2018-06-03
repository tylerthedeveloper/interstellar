"use strict";
/** Firesbase */
require('firebase');
const productRouter = require('express').Router();

productRouter.get('/', (req, res) => {
    console.log('all products on server')
    req.db.collection('products').get()
        .then((collectionSnapshot) => {
            const docs = collectionSnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
            res.status(res.statusCode).send(docs);
        })
        .catch((err) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

productRouter.post('/', (req, res) => {
    console.log('post product');
    const product = req.body;
    const productID = product['id'];
    const productCat = product['productCategory'];
    const userID = product['productSellerData']['productSellerID'];
    const IDPackage = JSON.stringify({id: productID})
    const batch = req.db.batch();
    batch.set(req.db.collection('products').doc(productID), product);
    batch.set(req.db.collection('users-products').doc(userID).collection('products').doc(productID), product);
    batch.set(req.db.collection('products-categories').doc(productCat).collection('products').doc(productID), product);
    batch.commit().then(() => res.status(res.statusCode).send(IDPackage))
        .catch((err) => res.status(res.statusCode).send(err));
});


productRouter.get('/:productID', (req, res) => {
    console.log('get product');    
    const productID = req.params['productID'];
    console.log(productID);
    req.db.collection('products').doc(productID).get()
        .then((documentSnapshot) => {
            // console.log(documentSnapshot.data());
            res.status(res.statusCode).send(documentSnapshot.data());
        })
        .catch((err) => {
            res.status(res.statusCode).send(err);
        });
});

productRouter.delete('/:productID', (req, res) => {
    console.log('delete product');
    const productID = product['id'];
    const productCat = product['productCategory'];
    const userID = product['productSellerData']['productSellerID'];
    const IDPackage = JSON.stringify({id: productID})
    const batch = req.db.batch();
    batch.delete(req.db.collection('products').doc(productID));
    batch.delete(req.db.collection('users-products').doc(userID).collection('products').doc(productID));
    batch.delete(req.db.collection('products-categories').doc(productCat).collection('products').doc(productID));
    batch.commit()
        .then(() => res.status(res.statusCode).send(IDPackage))
        .catch((err) => res.status(res.statusCode).send(err));
});

// FIXME: CHANGE TO USER-PRODUCTS
productRouter.get('/user-products/:userID', (req, res) => {
    console.log('get user products');
    const userID = req.params['userID'];
    console.log(userID);
    req.db.collection('users-products').doc(userID).collection('products').get()
        .then((collectionSnapshot) => {
            console.log('user products on server')
            const docs = collectionSnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
            res.status(res.statusCode).send(docs);
        })
        .catch((err) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

// FIXME: CHANGE TO PRODUCT-CATEGORIES AND MOVE TO CATEGORY route
productRouter.get('/categories/:category', (req, res) => {
    console.log('get user products categories');
    const category = req.params['category'];
    console.log(category);
    req.db.collection('products-categories').doc(category).collection('products').get()
        .then((collectionSnapshot) => {
            const docs = collectionSnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
            // console.log(docs)
            res.status(res.statusCode).send(docs);
        })
        .catch((err) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

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
module.exports = productRouter;
//# sourceMappingURL=products.js.map