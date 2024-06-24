const ProductController = require("../../controllers/Product.controller");

module.exports = {
	// Products
	allProducts: async (_, {}, {user}) => {
		if(user){
			return await ProductController.getAllProducts()
		}else{
			return null
		}
	},
	searchProduct: async (_, {id}, {user}) => {
		if(user){
			const searchProduct = await ProductController.getProductById(id)
			return searchProduct ?? null
		}else{
			return null
		}
	}
};
