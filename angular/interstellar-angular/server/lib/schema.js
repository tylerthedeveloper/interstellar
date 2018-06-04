// import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
// import mocks from './mocks';

const typeDefs = `
    type Query {
        hello: String
    }
    type Author {
        id: Int
        firstName: String
        lastName: String
        posts: [Post]
    }
    type Post {
        id: Int
        title: String
        text: String
        views: Int
        author: Author
    }
`;

const schema = makeExecutableSchema({ typeDefs });

// export default schema;
module.exportsexport = schema;


// // Require graphql
// const { buildSchema } = require('graphql');

// // Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//     type Query {
//         hello: String,
//         rollDice(numDice: Int!, numSides: Int): [Int]
//     }
// `);

// module.exports = schema;

const RootQuery = `
  type RootQuery {
    comment(id: Int!): Comment
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, RootQuery, Comment
  ],
  resolvers: {},
});
