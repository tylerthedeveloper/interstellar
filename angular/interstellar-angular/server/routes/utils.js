const firebaseDbURL =  'https://firestore.googleapis.com/v1beta1/projects/galactic-storage/databases/(default)/documents';
// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = (typeof err === 'object') ? err.message : err;
    res.status(501).json(response);
};

// Response handling
const response = {
    status: 200,
    data: [],
    message: null
};

const utils = {
    firebaseDbURL: firebaseDbURL,
    response: response,
    sendError: sendError
};

module.exports = utils;
