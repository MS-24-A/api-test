const User = require("../db/models/User.model");

class UserController {

  async getAllUsers() {
    return await User.find();
  }

  async getUserByUsername(username) {
    return await User.findOne({ username: username });
  }

  async createUser(username, password, type) {
    const data = {
      username: username,
      password: password,
      type: type,
      status: 1
    };
    const user = await User.create(data)
    return user ? user : false;
  }

  async updateOne(query, data) {
    await User.updateOne(query, data);
    return this.findOne(query);
  }

  async findOne(query) {
    let user = await User.findOne(query);
    return user ? user : false;
  }

}

module.exports = new UserController();
