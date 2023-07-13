import { Router } from 'express';

import PixController from '../resources/pix/pix.controller.js';
import userAuthenticad from '../middlewares/userAuthenticad.js';

const pixController = new PixController();
const pixRouter = Router();


pixRouter.post('/request', pixController.request); 
pixRouter.get('/qrcode', pixController.getQrcode);
pixRouter.get('/extract', pixController.extract);
pixRouter.post('/pay', pixController.pay);

export default pixRouter