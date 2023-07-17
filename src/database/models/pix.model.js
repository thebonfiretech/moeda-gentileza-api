import mongoose from 'mongoose';

const PixSchema = new mongoose.Schema({
    user:{
        type: String
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
        type: String
    }

});


export default mongoose.model('pix', PixSchema);