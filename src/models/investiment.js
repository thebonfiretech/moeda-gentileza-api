import mongoose from "mongoose";

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

export default mongoose.model('investiment', InvestmentSchema);
