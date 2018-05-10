// https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)
const express = require('express');
// import * as express from 'express';

const router = express.Router();

// firebase Connect ... 
// todo: wtf is clousre
// const connection = (closure) => {
//     return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
//         if (err) return console.log(err);

//         closure(db);
//     });
// };

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = (typeof err == 'object') ? err.message : err;
    res.status(501).json(response);
};

// Response handling
const response = {
    status: 200,
    data: [],
    message: null
};

// Get docs
// const docs = ../documentation
router.get('/docs', (req, res) => {
    //res.json(users);
});


// Get users
const users = ['tito', 'jon-A'];
router.get('/users', (req, res) => {
    res.json(users);
});

module.exports = router;
