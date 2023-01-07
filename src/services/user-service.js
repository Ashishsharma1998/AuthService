const userRepositroy = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

class userService {
  constructor() {
    this.userRepositroy = new userRepositroy();
  }

  async create(data) {
    try {
      const response = await this.userRepositroy.create(data);
      return response;
    } catch (error) {
      console.log("something went wrong in user service layer");
      throw { error };
    }
  }

  createToken(user) {
    try {
      const newToken = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return newToken;
    } catch (error) {
      console.log("something went wrong in creating json web token!");
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

  checkPassword(plainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
      console.log("something went wrong in password matching!");
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      //get user by email from db
      const user = await this.userRepositroy.getByEmail(email);
      //   console.log(user);

      //then match the password i.e plain with encrypted one
      const passwordMatch = this.checkPassword(password, user.password);

      if (!passwordMatch) {
        console.log("password is not correct!");
        throw { error: "password is not matching" };
      }
      //if password matched then return jwt to the user
      const newJwtToken = this.createToken({ email: user.email, id: user.id });
      return newJwtToken;
    } catch (error) {
      console.log("something went wrong in signIn service!");
      throw error;
    }
  }
}

module.exports = userService;
