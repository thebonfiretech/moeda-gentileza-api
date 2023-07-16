import { Router } from 'express';

import UserController from '../resources/user/user.controller.js';
import userAuthenticad from '../middlewares/userAuthenticad.js';

const userController = new UserController();
const userRouter = Router();


userRouter.put('/update', userAuthenticad, userController.updateUser);
userRouter.get('/me', userAuthenticad, userController.me);
userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);

export default userRouter