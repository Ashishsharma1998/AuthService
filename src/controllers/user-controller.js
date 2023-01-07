const userService = require("../services/user-service");

const UserService = new userService();

const create = async (req, res) => {
  try {
    const response = await UserService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: response,
      success: true,
      message: "user is successfully created",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create user",
      err: { error },
    });
  }
};

module.exports = {
  create,
};
