const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require('body-parser');
const userRoutes = require("./routes/users");
const cors = require("cors");

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

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build', 'index.html')));
}
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use('/user', userRoutes);


app.listen(PORT, () => console.log(`Backend server started on port: ${PORT}`));