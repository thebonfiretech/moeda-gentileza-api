import mongoose from 'mongoose';

const PixSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId
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
        type: mongoose.Schema.Types.ObjectId
    }

});


export default mongoose.model('pix', PixSchema);