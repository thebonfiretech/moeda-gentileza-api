import BlogService from './blog.services.js';


export default class BlogController {
        
        async createPost(req, res){
                const BlogService = new BlogService();
                const response = await BlogService.createPost();
                return { response };
        }

        async updatePost(req, res){
                const BlogService = new BlogService();
                const response = await BlogService.updatePost();
                return { response };
        }

        
        async deletePost(req, res){
                const BlogService = new BlogService();
                const response = await BlogService.deletePost();
                return { response };
        }

        async getPostList(req, res){
                const BlogService = new BlogService();
                const response = await BlogService.getPostList();
                return { response };
        }

        async getPost(req, res){
                const BlogService = new BlogService();
                const response = await BlogService.getPost();
                return { response };
        }

}