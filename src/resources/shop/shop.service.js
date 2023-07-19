import salesModel from "../../database/models/sales.model.js";
import shopModel from "../../database/models/shop.model.js";
import userModel from "../../database/models/user.model.js";

export default class ShopService {

    async getProduct(id){
      try {
        var product = await shopModel.findOne({_id: id});
        if (!product) return { error: "product_not_found"}; 
  
        return product
    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async getProductList(){
    try {
      return await shopModel.find().sort({ date: -1 }).limit(20);
    } catch (error) {
      return { error: "internal_error" } ;
    }
  }


  async CreateProduct(user, description, title, value, stock, images){
    try {
      var findUser = await userModel.findById(user).select("-password");
      if (!findUser) return { error: "user_not_found"}; 

      var product = new shopModel({
        creator:{
          name: findUser.name,
          id: findUser.id
        },
        title,
        stock,
        description,
        value,
        images

      });

      await product.save();
      
      return product

    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async UpdateProduct(data){
    try {
      var updatedProduct = await shopModel.findOneAndUpdate(
        {_id: data._id},
        {$set: {
          data
        }},
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return updatedProduct
    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async payProduct(user, id){
    try {
      var product = await shopModel.findOne({_id: id});
      if (!product) return { error: "product_not_found"}; 

      var findUser = await await userModel.findById(user).select("-password");
      if (!findUser) return { error: "user_not_found"}; 

      if (findUser.wallet < product.value) return { error: "insufficient_funds"};
      findUser.wallet -= product.value;
      
      var sale = new salesModel({
        value: product.value,
        name: product.name,
        user, 
        id
      });
      
      await findUser.save();
      await sale.save();

      return {
        user: findUser,
        product,
        sale 
      }

    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async updateUserProduct(id){
    try {
      
      var sale = await salesModel.findOne({_id: id});
      if (!sale) return { error: "product_not_found"}; 
      if (sale.status == "delivered") return { error: "product_not_found"}; 


      var product = await shopModel.findOne({_id: sale.id});
      if (!product) return { error: "product_not_found"}; 

      sale.status = "delivered";
      product.productSold += 1;
      product.stock -= 1;

      
         await product.save();
         await sale.save();


      return { product, sale }

    } catch (error) {
      return { error: "internal_error" } ;
    }
  }

  async deleteProduct(data){
    try {
      await shopModel.deleteOne({_id: data._id});
      return
    } catch (error) {
      return { error: "internal_error" } ;
    }
  }


}
