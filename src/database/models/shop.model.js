import mongoose from 'mongoose';

const ShopSchema = new mongoose.Schema({
    creator:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    },
    description:{
        type: String
    },
    title: {
        type: String
    },
    productsSold:{
        type: String
    },
    value:{
        type: Number
    }
});


export default moongose.model('shop', ShopSchema);