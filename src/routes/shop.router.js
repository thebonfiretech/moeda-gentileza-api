import { Router } from 'express';

import ShopController from '../resources/shop/shop.controller.js';
import userAuthenticad from '../middlewares/userAuthenticad.js';

const shopController = new ShopController();
const shopRouter = Router();


shopRouter.put('/update/user/product', userAuthenticad, shopController.updateUserProduct); //admin
shopRouter.delete('/delete', userAuthenticad, shopController.deleteProduct); //admin
shopRouter.post('/create', userAuthenticad, shopController.CreateProduct); //admin
shopRouter.put('/update', userAuthenticad, shopController.UpdateProduct); //admin
shopRouter.post('/pay', userAuthenticad, shopController.payProduct); 
shopRouter.get('/product-list', shopController.getProductList);  
shopRouter.get('/', shopController.getProduct); 


export default shopRouter