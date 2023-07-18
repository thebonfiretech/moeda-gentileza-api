import mongoose from 'mongoose';

const BlogModel = new mongoose.Schema({
    creator:{
        name:{
            type: String
        },
        id:{
            type: Number
        }
    },
    date:{
        default: Date.now(),
        type: Date
    },
    description:{
        type: String
    },
    title: {
        type: String
    },
    resume:{
        type: String
    },
    image:{
        type: String
    }
});


export default mongoose.model('blog', BlogModel);