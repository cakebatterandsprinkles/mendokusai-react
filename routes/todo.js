const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todos");

// @route  GET /user/today
// @desc   Get User todos reserved for today
// @access private

router.get("/user/today", todoController.getToday);

// @route  POST /user/today
// @desc   Add new todos to today
// @access private

router.get("/user/today", todoController.postToday);

module.exports = router;
