import moongose from 'moongose';

const UserSchema = new moongose.Schema({
    name:{
        type: String,
        required: true
    },
    id:{
        required: true,
        unique: true,
        type: Number,
    },
    state:{
        type: String,
        default: 'created'
    },
    school:{
        type: String
    },
    wallet:{
        type: Number,
        default: 0
    },
    image:{
        type: String
    },
    password:{
        type: String
    },
    banner:{
        type: String
    },
    role:{
        type: String,
        default: "default"
    },
    date:{
        type: Date,
        default: Date.now()
    },
    bio:{
        type: String
    }
    
});


export default moongose.model('user', UserSchema);