const data = {
    messages: require('./chat-messages.js').chatMessages, 
    chatThreads: require('./chat-threads.js').chatThreads, 
    orders: require('./orders.js').orders, 
    electronics: require('./products-electronics.js').electronics, 
    products: require('./products.js').products, 
    users: require('./users.js').users, 
    products: require('./products.js').products, 
    transactions: require('./transactions.js').transactions, 
};

module.exports = data;