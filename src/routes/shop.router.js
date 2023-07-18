import { Router } from 'express';

import ShopController from '../resources/shop/shop.controller.js';
import userAuthenticad from '../middlewares/userAuthenticad.js';

const shopController = new ShopController();
const shopRouter = Router();


shopRouter.put('/update/user/product', shopController.updateUserProduct); //admin
shopRouter.get('/product-list', shopController.getProductList); 
shopRouter.delete('/delete', shopController.deleteProduct); //admin
shopRouter.post('/create', shopController.CreateProduct); //admin
shopRouter.put('/update', shopController.UpdateProduct); //admin
shopRouter.get('/product', shopController.getProduct); 
shopRouter.post('/pay', shopController.payProduct); 


export default shopRouter