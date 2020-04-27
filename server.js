const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASS = process.env.MONGODB_PASS;

mongoose.connect(MONGODB_URI, {
  auth: {
    user: MONGODB_USERNAME,
    password: MONGODB_PASS
  },
  useNewUrlParser: true
}, function (error) {
  console.log(error);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.listen(PORT, () => console.log(`Backend server started on port: ${PORT}`));