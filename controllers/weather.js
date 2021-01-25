const fetch = require("node-fetch");

exports.getWeather = (req, res, next) => {
  const lat = req.params.lat;
  const long = req.params.long;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.OPENWEATHERMAP_APIKEY}&units=imperial`
  )
    .then((blob) => blob.json())
    .then((data) => res.json(data));
};
