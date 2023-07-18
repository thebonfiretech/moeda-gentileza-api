import ShopService from './shop.service.js';
import sendError from '../../utils/error.js';

export default class ShopController {
        
        async getProduct(req, res){
                var { id } = req.body;
                const shopService = new ShopService();
                const response = await shopService.getProduct(id);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);      
        }

        async getProductList(req, res){
                const shopService = new ShopService();
                const response = await shopService.getProductList();
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);      
        }

        
        async CreateProduct(req, res){
                var { description, title, value, stock, images } = req.body;
                var user = req.user.id;
                const shopService = new ShopService();
                const response = await shopService.CreateProduct(user, description, title, value, stock, images);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);      
        }

        async UpdateProduct(req, res){
                var data = req.body;
                const shopService = new ShopService();
                const response = await shopService.UpdateProduct(data);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);      
        }

        async payProduct(req, res){
                var { id } = req.body;
                var user = req.user.id;
                const shopService = new ShopService();
                const response = await shopService.payProduct(user, id);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);      
        }

        async updateUserProduct(req, res){
                var { id } = req.body;
                const shopService = new ShopService();
                const response = await shopService.updateUserProduct(id);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);      
        }

        async deleteProduct(req, res){
                var data = req.body;
                const shopService = new ShopService();
                const response = await shopService.deleteProduct(data);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);      
        }

}