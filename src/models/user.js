import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role:{
    type: String
  },
  flags: {
    type: Object
  },
  status:{
    type: String,
    default: 'notRegistered'
  },
  governamentalId:{
    type: String
  },
  wallet:{
    type: Number,
    default: 0
  },
  investments:[
    {
      name: {
        type: String,
      },
      id:{
        type: String,
      },
      wallet:{
        type: Number
      },
      performance:{
        type: Number
      },
      lastUpdate:{
        type: Date
      },
      initialDate:{
        type: Date
      },
      percentage: {
        type: Number,
      },
      penalty: {
        type: Number,
      }
    }
  ]
});

export default mongoose.model('user', UserSchema);
