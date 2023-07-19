import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

import userModel from '../../database/models/user.model.js';

export default class UserService {

  async signIn(id, password) {
    try {
      var findUser = await userModel.findOne({id});
      if (!findUser) return { error: "user_not_found"}; 
      var isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch)  return { error: "incorrect_password" } ;
  
      var payload = {
        _id: updatedUser._id,
        name: updatedUser.name
      }
  
      var token = jwt.sign(payload, process.env.JWT);
      return token;
    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async signUp(id, password) {
    try {
      var findUser = await userModel.findOne({id});
      if (!findUser) return { error: "user_not_found"}; 
      var salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      var updatedUser = await userModel.findOneAndUpdate(
        {_id: findUser._id},
        {$set: {
          password,
          state: 'logged',
          wallet: 3,
          date: Date.now()
        }},
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      var payload = {
        _id: updatedUser._id,
        name: updatedUser.name
      }

      var token = jwt.sign(payload, process.env.JWT);
      return token;
    } catch (error) {
      return { error: "internal_error" } ;
    }
  }
  
  async me(user) {
    try {
      return await userModel.findById(user).select('-password');
    } catch (error) {
      return { error: "internal_error" } ;
    }
  }
  
  async updateUser(data, user) {    
    try {
      var findUser = await userModel.findById(user);
      if (!findUser) return { error: "user_not_found"}; 
      if (data?.password){
        var salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
      }
      var updatedUser = await userModel.findOneAndUpdate(
        {_id: user},
        {$set: {
         ...data
        }},
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).select('-password');

      return updatedUser

    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async createUser(name, id, institution, role="default"){
    try {
      const isUnique = async (x) => !(await userModel.findOne({ id: x }));

      const generateId = async () => {
        while (true) {
            const uniqueID = Math.floor(100000 + Math.random() * 900000);
            if (isUnique(uniqueID)) return uniqueID;
        }
    };

    if (id){
      id = Number(id)
      if (!(await isUnique(id))) id = await generateId();
    } else {
      id = await generateId();
    }
    
      var user = new userModel({
        name,
        id,
        institution,
        role

      });

      await user.save()

      return user;

    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

}

/*
criar id do usuario ao efetuar cadastro
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