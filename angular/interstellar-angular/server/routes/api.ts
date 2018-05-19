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


/** Import Routes */
const userRoute = require('./users.js');

/** Assign Routes */
router.use('/users', userRoute);

/** Exports */
module.exports = router;
