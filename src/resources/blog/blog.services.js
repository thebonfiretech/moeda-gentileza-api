import userModel from "../../database/models/user.model.js";
import blogModel from "../../database/models/blog.model.js";

export default class BlogService {

  async createPost(user, title, description, resume, image){
    try {
      var findUser = await userModel.findOne({id: user}).select("-password");
      if (!findUser) return { error: "user_not_found"}; 

      var post = new blogModel({
        creator:{
          name: findUser.name,
          id: user
        },
        description,
        title,
        resume,
        image

      });

      await post.save();
      
      return post

    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async updatePost(data){
    try {
      var updatedPost = await blogModel.findOneAndUpdate(
        {_id: data._id},
        {$set: {
          data
        }},
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return updatedPost
    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async deletePost(data){
    try {
      await blogModel.deleteOne({_id: data._id});
      return
    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async getPostList(){
    try {
      return await blogModel.find().sort({ date: -1 }).limit(20);
    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async getPost(id){
    try {
      var post = await blogModel.findOne({_id: id});
      if (post) return { error: "post_not_found"}; 

      return post
    } catch (error) {
      return { error: "internal_error" } ;
    }
}

}
