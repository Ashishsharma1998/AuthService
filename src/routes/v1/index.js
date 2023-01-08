const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user-controller");

const {
  authRequestValidator,
} = require("../../middlewares/auth-request-validator");

router.post("/signUp", authRequestValidator, userController.create);
router.post("/signIn", authRequestValidator, userController.signIn);

router.get("/isAuthenticated", userController.isAuthenticated);

module.exports = router;
