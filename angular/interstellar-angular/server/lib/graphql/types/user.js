
const schema = `
    type User {
        id: String
        userName: String
        fullName: String
        email: String
        birthdate: String
        age: Int
        address: String
        # stellar
        publicKey: String
        # todo: ...
        isValidBuyer: Boolean
        isValidSeller: Boolean
        # todo: ...
        accountCreated: String
        numberOfItemsSold: Int
        acceptedAssets: [AssetBalance]
    }

    type Query {
        allUsers: [User]
        userByID(id: String!): User
    }

    type Mutation {
        updateUser (
            # need to dump all attributes
            currName: String!
            newName: String
        ): User
    
        addUser (
            # {props}
            name: String!
        ): User
    
        deleteUser(fbid: String!): User
    }
    
    type Subscription {
        userUpdated: User
        userAdded: User
        userDeleted: User
    }
`;

module.exports = schema;
