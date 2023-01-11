const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user-controller");

const { middlewares } = require("../../middlewares/index");

router.post("/signUp", middlewares.authRequestValidator, userController.create);
router.post("/signIn", middlewares.authRequestValidator, userController.signIn);

router.get("/isAuthenticated", userController.isAuthenticated);

router.get(
  "/isAdmin",
  middlewares.isAdminRequestValidator,
  userController.isAdmin
);

module.exports = router;
