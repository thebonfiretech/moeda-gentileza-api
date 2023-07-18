import BlogService from './blog.services.js';
import sendError from '../../utils/error.js';

export default class BlogController {
        
        async createPost(req, res){
                var user = req.user.id;
                var { title, creator, description, resume, image } = req.body;
                const blogService = new BlogService();
                const response = await blogService.createPost(user, title, creator, description, resume, image);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);  
               
        }

        async updatePost(req, res){
                var data = req.body;
                const blogService = new BlogService();
                const response = await blogService.updatePost(data);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);  
                
        }

        
        async deletePost(req, res){
                var data = req.body;
                const blogService = new BlogService();
                const response = await blogService.deletePost(data);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);  
                
        }

        async getPostList(req, res){
                const blogService = new BlogService();
                const response = await blogService.getPostList();
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);  
                
        }

        async getPost(req, res){
                var { id } = req.body;
                const blogService = new BlogService();
                const response = await blogService.getPost(id);
                if (response?.error) return sendError(res, response.error);
                return res.status(200).json(response);  
                
        }

}