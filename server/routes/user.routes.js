const express = require("express");
const userController = require("../controllers/user.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.route("/register").post(userController.registerUser);

router.route("/login").post(userController.loginUser);

router.route("/logout").post(verifyJWT, userController.logoutUser);

router.route("/forgot-password").post(userController.forgotPassword);

router.route("/reset-password/:token").put(userController.resetPassword);

router.route("/refresh-token").post(userController.generateNewAccessToken);

module.exports = router;