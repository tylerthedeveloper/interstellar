const schema = `
    type Order {
        userID: String!
        orderID: String!
        timestamp: String!
        transactionsGroups: [TransactionGroup]
    }
`;

module.exports = schema;
