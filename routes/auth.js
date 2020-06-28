const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const verifyToken = require("../middleware/verifyToken");

// @route  POST /signup
// @desc   Register User
// @access public

router.post("/signup", authController.postSignup);

// @route  POST /login
// @desc   Login User
// @access public

router.post("/login", authController.postLogin);

// @route  POST /confirm
// @desc   Confirm User Email
// @access public

router.post("/confirm", authController.postConfirm);

// @route  POST /reset-password
// @desc   Reset User Password
// @access public

router.post("/reset-password", authController.postResetPassword);

// @route  POST /reset-request
// @desc   Request Reset User Password
// @access public

router.post("/reset-request", authController.postRequestReset);

// @route  POST /logout
// @desc   Logout User
// @access private

router.post("/logout", verifyToken, authController.postLogout);

// @route  POST /settings
// @desc   Change name and/or password of the User
// @access private

router.post("/settings", verifyToken, authController.postSettings);

module.exports = router;
