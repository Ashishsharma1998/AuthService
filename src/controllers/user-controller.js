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
    console.log(error);
    return res.status(error.statusCode).json({
      data: {},
      success: false,
      message: error.message,
      err: error.explanation,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await UserService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      data: response,
      success: true,
      message: "user successfully signIn",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "something went wrong!",
      err: error,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await UserService.isAuthenticated(token);
    return res.status(200).json({
      data: response,
      success: true,
      message: "user is authenticated!",
      err: {},
    });
  } catch (error) {
    console.log("something went wrong in is Authenticated controllers");
    return res.status(500).json({
      data: {},
      success: false,
      message: "user is not authenticated!",
      err: error,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await UserService.isAdmin(req.body.id);

    if (response)
      return res.status(200).json({
        data: response,
        success: true,
        message: "User is a Admin",
        err: {},
      });

    throw { error: "user is not admin" };
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "something went wrong!",
      err: error,
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin,
};
