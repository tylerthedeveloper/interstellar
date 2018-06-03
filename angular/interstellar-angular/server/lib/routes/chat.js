"use strict";

/** Firesbase */
require('firebase');

const chatRouter = require('express').Router();

chatRouter.post('/threads', (req, res) => {
    console.log('create thread')
    const chatThreadObj = req.body;
    const chatThreadID = chatThreadObj['chatThreadID'];
    const senderFbID = chatThreadObj['senderFbID'];
    const receiverFbID = chatThreadObj['receiverFbID'];
    // console.log(req.afs)
    console.log(chatThreadID)
    const batch = req.db.batch();
    const threadsRef = req.db.collection('user-chat-threads');
    batch.set(threadsRef.doc(senderFbID).collection('chatThreads').doc(chatThreadID), chatThreadObj);
    batch.set(threadsRef.doc(receiverFbID).collection('chatThreads').doc(chatThreadID), chatThreadObj);
    batch.commit()
        .then((writeResult) => {
            console.log(writeResult)
            const IDPackage = JSON.stringify({id: threadID})
            res.status(res.statusCode).send(IDPackage);
        })
        .catch((err) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

chatRouter.get('/threads/:threadID', (req, res) => {
    console.log('chat thread by id')
    const threadID = req.params['threadID'];
    req.db.collection('chat-threads').doc(threadID).collection('chatMessages').orderBy('sentAt').get()
        .then((collectionSnapshot) => {
            const docs = collectionSnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
            // console.log(docs)
            res.status(res.statusCode).send(docs);
        })
        .catch((err) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

chatRouter.post('/threads/:threadID', (req, res) => {
    console.log('post message chat thread by id')
    const threadID = req.params['threadID'];
    const chatMessage = req.body;
    console.log(chatMessage)
    req.db.collection('chat-threads').doc(threadID).collection('chatMessages').doc(threadID).set(chatMessage)
        .then((writeResult) => {
            // const docs = collectionSnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
            console.log(writeResult)
            const IDPackage = JSON.stringify({id: threadID})
            res.status(res.statusCode).send(IDPackage);
        })
        .catch((err) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

chatRouter.get('/threads/my-threads/:userID', (req, res) => {
    console.log('all user-chat-threads')
    const userID = req.params['userID'];
    req.db.collection('user-chat-threads').doc(userID).collection('chatThreads').get()
        .then((collectionSnapshot) => {
            const docs = collectionSnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
            // console.log(docs)
            res.status(res.statusCode).send(docs);
        })
        .catch((err) => {
            res.status(res.statusCode).json({ error: err.toString() });
        });
});

module.exports = chatRouter;
//# sourceMappingURL=chats.js.map