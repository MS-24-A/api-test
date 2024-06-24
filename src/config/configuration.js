require('dotenv').config()
module.exports = {
    "hostname": process.env.HOSTNAME,
    "port": process.env.PORT,
    "database":{
        "uri":process.env.DB_URI
    },
    "jwt_secret":process.env.JWT_SECRET
}