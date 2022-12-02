/* eslint-disable arrow-body-style */
/* eslint-disable no-return-await */
const Exchange = require('../models/Exchange');

module.exports = {
  Query: {
    getExchangeRate: async (_, { src, tgt }) => {
      const findData = Exchange.findOne({ src, tgt });
      return findData;
    },
    getExchangeRates: async (_, { amount }) => {
      return await Exchange.find().sort({ createdAt: -1 }).limit(amount);
    },
  },

  Mutation: {
    createExchangeRate: async (_, {
      info: {
        src, tgt, rate, date,
      },
    }) => {
      const newExchangeRate = new Exchange({
        src,
        tgt,
        rate,
        date,
      });

      await newExchangeRate.save();
      return newExchangeRate;
    },

    deleteExchangeRate: async (_, { info: { src, tgt, date } }) => {
      const willDelet = await Exchange.findOne({ src, tgt, date });
      const wasDeleted = (await Exchange.deleteOne({ src, tgt, date }))
        .deletedCount;
      if (wasDeleted) {
        return willDelet;
      }
      return new Error("This data doesn't exists");
    },

    postExchangeRate: async (_, {
      info: {
        src, tgt, rate, date,
      },
    }) => {
      const wasUpdated = (
        await Exchange.updateOne({ src, tgt, date }, { rate })
      ).modifiedCount;
      if (wasUpdated) {
        return {
          src,
          tgt,
          rate,
          date,
        };
      }
      const newExchangeRate = new Exchange({
        src,
        tgt,
        rate,
        date,
      });
      newExchangeRate.save();
      return newExchangeRate;
    },
  },
};
