require('dotenv').config()
const config = require("./config/configuration")
const express = require('express');
const app = express();
const apolloServer = require('./graphql')();
const mongoose = require("mongoose");
const UserMiddleware = require("./middleware/User.middleware")

const run = async () => {
	UserMiddleware(app);
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });
	app.listen(
		{
			port: config.port,
			hostname: config.hostname
		},
		() => {
			console.log(`🚀 Server ready at ${config.hostname}:${config.port}`);
			console.log(`🚀 Graphql ready at ${config.hostname}${apolloServer.graphqlPath}`);
			
  			mongoose.connect(config.database.uri, {
    			autoCreate: true
  			})
    		.then(() => {
      			console.log('conexión exitosa');
    		})
    		.catch((error) => {
      			console.log(error);
    		})
		}
	);
}
run();