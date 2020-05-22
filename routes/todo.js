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

// @route  GET /todo/bucketlist
// @desc   Get User bucketlist items
// @access private

router.get("/bucketlist", verifyToken, todoController.getBucketlist);

// @route  POST /todo/bucketlist
// @desc   Create/update bucketlist items
// @access private

router.post("/bucketlist", verifyToken, todoController.postBucketlist);

// @route  DELETE /todo/bucketlist
// @desc   Delete the todo with the id from the bucketlist
// @access private

router.delete("/bucketlist", verifyToken, todoController.deleteBucketlist);

// @route  GET /todo/calendar
// @desc   Get monthly User todo items for the calendar page
// @access private

router.get("/calendar", verifyToken, todoController.getCalendar);

// @route  POST /todo/calendar
// @desc   Create/update monthly User todo items for the calendar page
// @access private

router.post("/calendar", verifyToken, todoController.postCalendar);

module.exports = router;
