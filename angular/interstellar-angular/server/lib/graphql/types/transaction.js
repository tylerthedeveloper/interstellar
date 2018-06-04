const schema = `
    enum OrderType {
        Purchase, #= "Purchase",
        Sale #= 'Sale'
    }
    type TransactionPaymentDetails {
        senderPublicKey: String!
        receiverPublicKey: String!
        assetBalance: [AssetBalance]
        memo: String!
    }
    type TransactionRecord {
        # TODO: below 2.....
        transactionID: String!
        timestamp: String!
        buyerUserID: String!
        senderPublicKey: String!
        sellerUserID: String!
        receiverPublicKey: String!
        assetPurchaseDetails: AssetBalance
        memo: String!
        productID: String!
        productName: String!
        productShortDescription: String!
        oldQuantity: Int!
        quantityPurchased: Int!
        fixedUSDAmount: Int!
        productCategory: String!
        orderType: OrderType
    }
    type TransactionGroup {
        transactionGroupID: String!
        sellerPublicKey: String!
        timestamp: String!
        transactionRecords: [TransactionRecord]
        transactionPaymentDetails: TransactionPaymentDetails
        isPaidFor: Boolean
    }
`;

module.exports = schema;
