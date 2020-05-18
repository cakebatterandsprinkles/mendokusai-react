const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const verifyToken = require("../middleware/verifyToken");

// @route  GET /user
// @desc   Get User
// @access private

router.get("user", verifyToken, authController.getMe);
