const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weather");

// @route  GET /now
// @desc   Get weather data
// @access public

router.get("/now/:lat/:long", weatherController.getWeather);

module.exports = router;
