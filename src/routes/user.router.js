import { Router } from 'express';

import UserController from '../resources/user/user.controller.js';
import userAuthenticad from '../middlewares/userAuthenticad.js';

const userController = new UserController();
const userRouter = Router();


userRouter.put('/update', userController.updateUser);
userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.get('/me', userController.me);

export default userRouter