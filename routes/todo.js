const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todos");
const verifyToken = require("../middleware/verifyToken");

// @route  GET /todo/today
// @desc   Get User todos reserved for today
// @access private

router.get("/today", verifyToken, todoController.getToday);

// @route  POST /todo/today
// @desc   Create/update new todos for today
// @access private

router.post("/today", verifyToken, todoController.postToday);

// @route  DELETE /todo
// @desc   Delete the todo with the id
// @access private

router.delete("/", verifyToken, todoController.deleteTodo);

module.exports = router;
