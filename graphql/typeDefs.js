const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        getExchangeRate(src: String!, tgt: String!): ExchangeInfo
        getExchangeRates(amount: Int!): [ExchangeInfo]
    }

    type Mutation {
        postExchangeRate(info: InputUpdateExchangeInfo): ExchangeInfo
        deleteExchangeRate(info: InputDeleteExchangeInfo): ExchangeInfo
        createExchangeRate(info: InputUpdateExchangeInfo): ExchangeInfo
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
