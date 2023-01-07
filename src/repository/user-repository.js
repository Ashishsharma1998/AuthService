const { User } = require("../models/index");

class userRepositroy {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong in user repo!");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      console.log("something went wrong in user repo!");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const response = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return response;
    } catch (error) {
      console.log("something went wrong in user repo!");
      throw error;
    }
  }
}

module.exports = userRepositroy;
