import { Router } from 'express';

import UserController from '../resources/user/user.controller.js';
import userAuthenticad from '../middlewares/userAuthenticad.js';

const userController = new UserController();
const userRouter = Router();


export default userRouter