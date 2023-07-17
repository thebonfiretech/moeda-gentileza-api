import userModel from '../../database/models/user.model.js';
import pixModel from '../../database/models/pix.model.js';
import jwt from 'jsonwebtoken';

export default class PixService {

  async pay(user, receiver, value, description="") {
    try {
      var findUser = await userModel.findOne({id: user}).select("-password");
      if (!findUser) return { error: "user_not_found"}; 

      var findReceiver = await userModel.findOne({id: receiver}).select("-password");
      if (!findReceiver) return { error: "receiver_not_found"}; 

      if (findUser.wallet < value) return { error: "insufficient_funds"};

      findUser.wallet -= value;
      findReceiver.wallet += value;

      await findUser.save();
      await findReceiver.save();

      var pix = new pixModel({
        user,
        receiver,
        description,
        value,
        paidIn: Date.now()

      });

      await pix.save();

      return { user: findUser, receiver: findReceiver};

    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async paymentInformation(receiver){
    try {
      var findReceiver = await userModel.findOne({id: receiver}).select("-password");
      if (!findReceiver) return { error: "receiver_not_found"}; 
      return { name: findReceiver.name }
    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async request(user, value, description=""){
    try {
      var findUser = await userModel.findOne({id: user}).select("-password");
      if (!findUser) return { error: "user_not_found"}; 

      var payload = {
        date: Date.now(),
        description,
        value,
        user,
      }

      var token = jwt.sign(payload, process.env.JWT);
      return token

    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async extract(user) {
    try {
      return await pixModel.find({ user }).sort({ date: -1 }).limit(30);
    } catch (error) {
      return { error: "internal_error" } ;
    }
  }
  
  async getQrcode(){
    try {

    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

}
