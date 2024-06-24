const JWT = require("jsonwebtoken")
const { jwt_secret } = require('../config/configuration')
const UserController = require("../controllers/User.controller")

module.exports = (app) => {
	app.use(async (req, res, next) => {
		try {
			const jwt = req.headers && req.headers.authorization && req.headers.authorization.split(' ')[1];
			if (jwt) {
				const decoded = JWT.verify(jwt, jwt_secret);
				const user = await UserController.getUserByUsername(decoded.username)
				req.user = user;
			}
		} catch (e) {

		}
		next();
	});
}