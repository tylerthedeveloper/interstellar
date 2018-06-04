// https://github.com/tomyitav/graphql-server-seed
const path = require('path');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const typesArray = fileLoader(path.join(__dirname, './types'), { recursive: true });
// const resolversArray = fileLoader(path.join(__dirname, '../resolvers'));
const allTypes = mergeTypes(typesArray);
// const allResolvers = mergeResolvers(resolversArray);
const schema = makeExecutableSchema({
    typeDefs: allTypes,
    // resolvers: allResolvers
});

module.exports = schema;