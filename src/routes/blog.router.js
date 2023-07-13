import { Router } from 'express';

import BlogController from '../resources/blog/blog.controller.js';
import userAuthenticad from '../middlewares/userAuthenticad.js';

const blogController = new BlogController();
const blogRouter = Router();


blogRouter.get('/post-list', blogController.getPostList);
blogRouter.delete('/delete', blogController.deletePost);
blogRouter.post('/create', blogController.createPost); 
blogRouter.put('/update', blogController.updatePost);
blogRouter.get('/', blogController.getPost);

export default blogRouter