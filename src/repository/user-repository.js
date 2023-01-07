const { User } = require("../models/index");

class userRepositroy {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong in user repo!");
      throw { error };
    }
  }
}

module.exports = userRepositroy;
