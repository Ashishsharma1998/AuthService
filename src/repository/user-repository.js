const ValidationError = require("../utils/validation-error");
const { User, Role } = require("../models/index");
const { StatusCodes } = require("http-status-codes");
const ClientError = require("../utils/client-error");

class userRepositroy {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error);
      }
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

  async getByEmail(userEmail) {
    try {
      const response = await User.findOne({
        where: {
          email: userEmail,
        },
      });

      if (!response) {
        throw new ClientError(
          "Attribute Not found",
          "Invalid email sent in the request",
          "please check the email, as there is no record with this email ",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
    } catch (error) {
      console.log("something went wrong in user repo!");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const role = await Role.findOne({
        where: {
          name: "Admin",
        },
      });

      return user.hasRole(role);
    } catch (error) {
      console.log("something went wrong in user repo!");
      throw error;
    }
  }
}

module.exports = userRepositroy;
