// type ExchangeInfo @key(fields: "src, tgt") {
//   src: String!
//   tgt: String!
//   rate: Float!
//   date: String!
// }
module.exports = [
  {
    src: 'krw',
    tgt: 'usd',
    rate: 0.0007812,
    date: '2022-10-10',
  },
  {
    src: 'usd',
    tgt: 'krw',
    rate: 1300.2,
    date: '2022-11-10',
  },
  {
    src: 'krw',
    tgt: 'usd',
    rate: 0.12345,
    date: '2022-10-10',
  },
  {
    src: 'krw',
    tgt: 'usd',
    rate: 0.78901,
    date: '2022-10-10',
  },
  {
    src: 'usd',
    tgt: 'krw',
    rate: 1300.2,
    date: '2022-11-28',
  },
];
