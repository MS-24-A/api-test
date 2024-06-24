const jwt = require("jsonwebtoken");
const { jwt_secret } = require('../../config/configuration')
const UserController = require("../../controllers/User.controller");
const ProductController = require("../../controllers/Product.controller");

module.exports = {
    login: async (_,{credentials},context) => {
        const user = await UserController.getUserByUsername(credentials.username)
        if(user && user.password == credentials.password){
            return {
                username: user.username,
                token: jwt.sign({username:user.username,type:user.type},jwt_secret),
                type: user.type
            }
        }
    },

    // Products
    createProduct: async (_,{product},{user}) => {
        if(user && user.type == "admin"){
            const newProduct = await ProductController.createProduct(product)
            if(newProduct){
                return {
                    error: false,
                    message: "Ok",
                    product: newProduct
                }
            }else{
                return {
                    error: true,
                    message: "Error to create product",
                    product: null
                }
            }
        }else{
            return {
                error: true,
                message: "Not authorized",
                product: null
            }
        }
    },
    updateProduct: async (_,{product},{user}) => {
        if(user && user.type == "admin"){
            const searchProduct = await ProductController.getProductById(product.id)
            if(searchProduct){
                const updateProduct = await ProductController.updateOne({_id:product.id},product)
                return {
                    error: false,
                    message: "Ok",
                    product: updateProduct
                }
            }else{
                return {
                    error: true,
                    message: "Product Not Found",
                    product: null
                }
            }
        }else{
            return {
                error: true,
                message: "Not authorized",
                product: null
            }
        }
    },
    deleteProduct: async (_,{id},{user}) => {
        if(user && user.type == "admin"){
            const searchProduct = await ProductController.getProductById(id)
            if(searchProduct){
                const deleteProduct = await ProductController.updateOne({_id:id},{status:0})
                return {
                    error: false,
                    message: "Ok",
                    product: deleteProduct
                }
            }else{
                return {
                    error: true,
                    message: "Product Not Found",
                    product: null
                }
            }
        }else{
            return {
                error: true,
                message: "Not authorized",
                product: null
            }
        }
    },
}
