/* eslint-disable consistent-return */
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { ApolloServer } = require('apollo-server');
const { mongoose } = require('mongoose');

const MONGO_DB = '';
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
});

mongoose
  .connect(MONGO_DB, { useNewUrlParser: true })
  .then(() => {
    console.log('mongodb connected');
    return server.listen({ port: 5110 });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  });
