const mongoose = require("mongoose");

const InvestmentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  percentage: {
    type: Number,
    default: 0.5,
  },
  penalty: {
    type: Number,
    default: 5,
  },
});

module.exports = mongoose.model('investiment', InvestmentSchema);
