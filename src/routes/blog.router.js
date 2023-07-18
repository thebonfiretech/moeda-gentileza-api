import { Router } from 'express';

import BlogController from '../resources/blog/blog.controller.js';
import userAuthenticad from '../middlewares/userAuthenticad.js';

const blogController = new BlogController();
const blogRouter = Router();


blogRouter.delete('/delete', userAuthenticad, blogController.deletePost);
blogRouter.post('/create', userAuthenticad, blogController.createPost); 
blogRouter.put('/update', userAuthenticad, blogController.updatePost);
blogRouter.get('/post-list', blogController.getPostList);
blogRouter.get('/', blogController.getPost);

export default blogRouter