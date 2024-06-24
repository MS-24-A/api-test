const Product = require("../db/models/Product.model");

class ProductController {

  async getAllProducts() {
    return await Product.find({status:1});
  }

  async getProductById(id) {
    return await Product.findOne({ _id: id });
  }

  async getProductByName(name) {
    return await Product.findOne({ name: name });
  }

  async getProductsByPrice(price) {
    return await Product.find({ price: price });
  }

  async createProduct({name, price}) {
    const data = {
      name: name,
      price: price,
      status: 1
    };
    const product = await Product.create(data)
    return product ? product : false;
  }

  async updateOne(query, data) {
    await Product.updateOne(query, data);
    return this.findOne(query);
  }

  async findOne(query) {
    let product = await Product.findOne(query);
    return product ? product : false;
  }

}

module.exports = new ProductController();
