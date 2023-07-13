import moongose from 'moongose';

const PixSchema = new moongose.Schema({
    user:{
        type: moongose.Schema.Types.ObjectId
    },
    id:{
        type: Number
    },
    date:{
        type: Date,
        default: Date.now()
    },
    description:{
        type: String
    },
    value: {
        type: Number
    },
    paidIn:{
        type: Number
    },
    receiver:{
        type: moongose.Schema.Types.ObjectId
    }

});


export default moongose.model('pix', PixSchema);