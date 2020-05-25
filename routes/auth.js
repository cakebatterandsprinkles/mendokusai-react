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

// @route  POST /logout
// @desc   Logout User
// @access private

router.post("/logout", verifyToken, authController.postLogout);

module.exports = router;
