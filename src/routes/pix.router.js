import { Router } from 'express';

import PixController from '../resources/pix/pix.controller.js';
import userAuthenticad from '../middlewares/userAuthenticad.js';

const pixController = new PixController();
const pixRouter = Router();


pixRouter.get('/pay/receiver-infomation', userAuthenticad, pixController.paymentInformation);
pixRouter.post('/request', userAuthenticad, pixController.request); 
pixRouter.get('/extract', userAuthenticad, pixController.extract);
pixRouter.post('/pay', userAuthenticad, pixController.pay);
pixRouter.get('/qrcode', pixController.getQrcode);

export default pixRouter