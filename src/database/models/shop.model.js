import moongose from 'moongose';

const ShopSchema = new moongose.Schema({
    creator:{
        type: moongose.Schema.Types.ObjectId
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