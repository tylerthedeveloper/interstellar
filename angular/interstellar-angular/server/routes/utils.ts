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

export { sendError, response };
