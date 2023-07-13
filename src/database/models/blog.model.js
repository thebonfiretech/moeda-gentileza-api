import moongose from 'moongose';

const BlogModel = new moongose.Schema({
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
    resume:{
        type: String
    }
});


export default moongose.model('blog', BlogModel);