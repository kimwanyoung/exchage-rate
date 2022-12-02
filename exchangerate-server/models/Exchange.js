const { model, Schema } = require('mongoose');

const ExchangeInfoSchema = new Schema({
  src: String,
  tgt: String,
  rate: Number,
  date: String,
});

module.exports = model('ExchangeInfo', ExchangeInfoSchema);
