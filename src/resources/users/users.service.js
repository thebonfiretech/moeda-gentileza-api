import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from "../../models/user.js";

export default class usersService {

    async signUp({name, governamentalId, password}){
        try {
            const findUsers = await userModel.find({
              status: "notRegistered",
            });
            var findUser = findUsers.find(x => x.governamentalId.toLocaleLowerCase().trim().replace(/\s/g, '') == governamentalId.toLocaleLowerCase().trim().replace(/\s/g, ''));
            if (!findUser) return { error: "user_not_registered" };

            if (findUser.status == 'logged') return { error: "user_already_exists"};

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const user = await userModel.findByIdAndUpdate(findUser._id, {
                status: 'logged',
                password: hash,
                governamentalId, 
                name, 

            }, {new: true});
            
            var payload = {
                _id: user._id,
                name
            }
            var token = jwt.sign(payload, process.env.JWT);
            return { token }

        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async signIn({governamentalId, password}){
        try {
           const user = await userModel.findOne({governamentalId});
           if (!user || user.status  != 'logged') return { error: "user_not_registered"};

           const salt = await bcrypt.genSalt(10);
           const hash = await bcrypt.hash(password, salt);
           const isMatch = hash === user.password;
           if (!isMatch) return { error: "invalid_credentials"};

            var payload = {
                _id: user._id
            }
            
            var token = jwt.sign(payload, process.env.JWT, {});
            return { token }
           
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async getUserById({id}){
        try {
           const user = await userModel.findById(id).select('-password');
           if (!user) return { error: "user_not_registered"};
           return { user };
        } catch (err) {
            console.log(err)
            return { error: "user_not_registered" } ;
        }
    }
    async updateUser({id, data}){
        try {
           const user = await userModel.findById(id);
           if (!user) return { error: "user_not_registered"};

           const newUser = await userModel.findByIdAndUpdate(id, {$set: {...data}}, {new: true, upsert: true});
           return { user: newUser};
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async createUser({governamentalId, role, flags=[]}){
        try {
            const findUser = await userModel.findOne({governamentalId});
            if (findUser) return { error: "user_already_exists"};
            const user = new userModel({
                governamentalId,
                role,
                flags
            });

            await user.save()

            return { user }
           
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async getUsers(){
        try {
           return await userModel.find().sort({date: -1}).select('-passoword');
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    async getTeachers(){
        try {
            return await userModel.find().sort({date: -1});
        } catch (err) {
            return { error: "internal_error" } ;
        }
    }
    
}