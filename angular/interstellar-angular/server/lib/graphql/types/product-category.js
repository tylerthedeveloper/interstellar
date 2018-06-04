const schema = `
    enum ProductCategoryEnum {
        Apparel , #= 'Apparel',
        Electronics , #= 'Electronics',
        Food , #= 'Food',
        Houseware , #= 'Houseware',
        Software , #= 'Software',
        Other , #= 'Other'
    }
    type ProductCategory {
        productCategoryEnum: ProductCategoryEnum
        category: String!
        thumbnailLink: String!
        description: String!
    }

    type Query {
        categories(category: String!): [ProductCategory]
    }

    type Mutation {    
        addProductToCategory (
            input: ProductInput
        ): Product
    
        deleteProductFromCategory(productID: String!): Product
    }
    
    type Subscription {
        productAdded: Product
        productDeleted: Product
    }
`;

module.exports = schema;

