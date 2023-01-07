const userRepositroy = require("../repository/user-repository");

class userService {
  constructor() {
    this.userRepositroy = new userRepositroy();
  }

  async create(data) {
    try {
      const response = await this.userRepositroy.create(data);
      return response;
    } catch (error) {
      console.log("something went wrong in user srevice layer");
      throw { error };
    }
  }
}

module.exports = userService;
