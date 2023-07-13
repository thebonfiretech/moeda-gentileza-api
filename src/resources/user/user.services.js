import jwt from "jsonwebtoken";
import crypto from "crypto-js";


import authConfig from "../../config/auth.js";
import sendError from "../../utils/error.js";

export default class UserService {
  async signIn(user, res) {
   
  }

  async signUp(user, res) {
   /*
      const generateId = async () => {
    let isUnique = false;
    let uniqueID;

    while(!isUnique){
        uniqueID = Math.floor(100000 + Math.random() * 900000);
        try{
            const existingUser = await UserSchema.findOne({id: uniqueID});
            if (!existingUser) isUnique = true;
        } catch (err){}
    }

    return uniqueID
    
}
   */
  }

  async me(user, res) {
   
  }

}
