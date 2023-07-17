import mongoose from 'mongoose';

const BlogModel = new mongoose.Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId
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
    resume:{
        type: String
    }
});


export default mongoose.model('blog', BlogModel);