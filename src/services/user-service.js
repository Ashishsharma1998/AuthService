const userRepositroy = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

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

  createToken(user) {
    try {
      const newToken = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return newToken;
    } catch (error) {
      console.log("Error while creating json web token!");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const verified = jwt.verify(token, JWT_KEY);
      return verified;
    } catch (error) {
      console.log("something went wrong in validation of token!");
      throw error;
    }
  }
}

module.exports = userService;
