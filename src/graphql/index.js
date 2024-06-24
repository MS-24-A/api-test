const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server-express');

//Inicializamos Server
const rootSchemasDir = __dirname + "/schemas/";
module.exports = () => {
	//CONTEXT
	const context = async ({ req, res }) => {
		return { 
			req,
			res,
			user: req.user
		}
	}

	//SCHEMAS
	let schemas = ``;
	require("fs").readdirSync(rootSchemasDir).forEach(filename => {
		schemas += require(rootSchemasDir + filename);
	});
	
	const typeDefs = gql`
		${schemas}

		type Query{
			# Products
			allProducts: 				[Product]
			searchProduct(id:String!): 	Product
		}

		type Mutation{
			# Users
			login(credentials:Login!): 	User

			# Products
			createProduct(product:ProductInput!): 	ProductResponse
			updateProduct(product:ProductInput!): 	ProductResponse
			deleteProduct(id:String!): 				ProductResponse
		}
	`

	return new ApolloServer({
		playground: true,
		typeDefs,
		resolvers: require("./resolvers/index"),
		context
	});
}


