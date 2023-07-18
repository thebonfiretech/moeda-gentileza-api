import mongoose from 'mongoose';

const SalesSchema = new mongoose.Schema({
    user:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    },
    name:{
        type: String
    },
    id:{
        type: String
    },
    value: {
        type: Number
    },
    status:{
        type: String,
        default: "paid"
    }
    
});


export default mongoose.model('sales', SalesSchema);