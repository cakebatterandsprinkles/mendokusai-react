const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const verifyToken = require("../middleware/verifyToken");

// @route  GET /user/info
// @desc   Get User
// @access private

router.get("/info", verifyToken, authController.getMe);

module.exports = router;
