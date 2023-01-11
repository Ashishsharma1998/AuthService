const authRequestValidator = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      data: {},
      success: false,
      message: "something went wrong!",
      err: "missing email or password in the request",
    });
  }
  next();
};

const isAdminRequestValidator = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      data: {},
      success: false,
      message: "something went wrong!",
      err: "missing userId in the request",
    });
  }

  next();
};

module.exports = {
  authRequestValidator,
  isAdminRequestValidator,
};
