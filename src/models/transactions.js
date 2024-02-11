import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    author:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
    },
    description: {
        type: String
    }
});

export default mongoose.model('transaction', TransactionSchema);