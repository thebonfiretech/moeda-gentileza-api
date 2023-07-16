import UserService from './user.services.js';
import sendError from '../../utils/error.js';

export default class UserController {
        
        async signUp(req, res){
                var { id, password } = req.body;
                const userService = new UserService();
                const response = await userService.signUp(id, password);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);
        }

        async signIn(req, res){
                var { id, password } = req.body;
                const userService = new UserService();
                const response = await userService.signIn(id, password);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);      
        }

        async updateUser(req, res){
                var user = req.user.id;
                var data = req.body;
                const userService = new UserService();
                const response = await userService.updateUser(data, user);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);     
        }

        async me(req, res){
                var user = req.user.id;
                const userService = new UserService();
                const response = await userService.me(user);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);        
        }
    
}