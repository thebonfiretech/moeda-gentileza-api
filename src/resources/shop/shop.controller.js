import ShopService from './shop.service.js';


export default class ShopController {
        
        async getProduct(req, res){
                const shopService = new ShopService();
                const response = await shopService.getProduct();
                return { response };
        }

        async getProductList(req, res){
                const shopService = new ShopService();
                const response = await shopService.getProductList();
                return { response };
        }

        
        async CreateProduct(req, res){
                const shopService = new ShopService();
                const response = await shopService.CreateProduct();
                return { response };
        }

        async UpdateProduct(req, res){
                const shopService = new ShopService();
                const response = await shopService.UpdateProduct();
                return { response };
        }

        async payProduct(req, res){
                const shopService = new ShopService();
                const response = await shopService.payProduct();
                return { response };
        }

        async removeProduct(req, res){
                const shopService = new ShopService();
                const response = await shopService.removeProduct();
                return { response };
        }

        async deleteProduct(req, res){
                const shopService = new ShopService();
                const response = await shopService.deleteProduct();
                return { response };
        }

}