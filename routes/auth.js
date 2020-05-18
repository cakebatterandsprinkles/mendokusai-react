const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// @route  POST /signup
// @desc   Register User
// @access public

router.post("/signup", authController.postSignup);

// @route  POST /login
// @desc   Login User
// @access public

router.post("/login", authController.postLogin);

module.exports = router;
