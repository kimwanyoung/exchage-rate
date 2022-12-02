/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { ApolloServer, gql } = require('apollo-server');
const data = require('./exchangeData');

let exchangeData = data;

const typeDefs = gql`
    type Query {
        getExchangeRate(src: String!, tgt: String!): ExchangeInfo
    }

    type Mutation {
        postExchangeRate(info: InputUpdateExchangeInfo): ExchangeInfo
        deleteExchangeRate(info: InputDeleteExchangeInfo): ExchangeInfo
    }

    input InputUpdateExchangeInfo {
        src: String!
        tgt: String!
        rate: Float!
        date: String!
    }

    input InputDeleteExchangeInfo {
        src: String!
        tgt: String!
        date: String!
    }

    type ExchangeInfo @key(fields: "src, tgt") {
        src: String!
        tgt: String!
        rate: Float!
        date: String!
    }
`;

const resolvers = {
  Query: {
    getExchangeRate: (parent, args, context, info) => exchangeData.filter(
      (props) => props.src === args.src && props.tgt === args.tgt,
    )[0],
  },
  Mutation: {
    postExchangeRate: (parent, args, context, info) => {
      let upsertData;
      for (let i = 0; i < exchangeData.length; i += 1) {
        if (
          exchangeData[i].src === args.info.src
                    && exchangeData[i].tgt === args.info.tgt
                    && exchangeData[i].date === args.info.date
        ) {
          upsertData = true;
        } else {
          upsertData = false;
        }
      }
      if (upsertData) {
        exchangeData
          .filter(
            (prop) => prop.src === args.info.src
                            && prop.tgt === args.info.tgt
                            && prop.date === args.info.date,
          )
          .map((props) => {
            Object.assign(
              props,
              JSON.parse(JSON.stringify(args.info)),
            );

            return JSON.parse(JSON.stringify(args.info));
          })[0];
      } else {
        exchangeData.push(JSON.parse(JSON.stringify(args.info)));

        return JSON.parse(JSON.stringify(args.info));
      }
    },
    deleteExchangeRate: (parent, args, context, info) => {
      const deleted = exchangeData.filter(
        (prop) => prop.src === args.info.src
                    && prop.tgt === args.info.tgt
                    && prop.date === args.info.date,
      )[0];
      exchangeData = exchangeData.filter(
        (prop) => prop.src !== args.info.src
                    && prop.tgt !== args.info.tgt
                    && prop.date !== args.info.date,
      );
      return deleted;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
