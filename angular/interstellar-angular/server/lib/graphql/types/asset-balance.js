const schema = `
    input AssetBalanceInput {
        balance: String
        asset_type: String
        coin_name: String
    }

    type AssetBalance {
        balance: String
        asset_type: String
        coin_name: String
    }
`;

module.exports = schema;
