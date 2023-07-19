import sendError from '../../utils/error.js';
import PixService from './pix.services.js';

export default class PixController {
        
        async pay(req, res){
                var { receiver, value, description} = req.body;
                var user = req.user.id;
                const userService = new PixService();
                const response = await userService.pay(user, receiver, value, description);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);
        }

        async paymentInformation(req, res){
                var { receiver } = req.body;
                const userService = new PixService();
                const response = await userService.paymentInformation(receiver);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);
        }

        async request(req, res){
                var { value, description } = req.body;
                var user = req.user.id;
                const userService = new PixService();
                const response = await userService.request(user, value, description);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);
        }

        
        async extract(req, res){
                var user = req.user.id;
                const userService = new PixService();
                const response = await userService.extract(user);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);
        }

        async getQrcode(req, res){
                const userService = new PixService();
                const response = await userService.getQrcode();
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);
        }
}