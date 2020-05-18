const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const User = require("../models/User");
const ToDo = require("../models/ToDo");
const generateToken = require("../util/generateToken");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

const validationSignUp = (name, email, password, repeatPassword) => {
  if (name.length < 2) {
    return "Username must be at least 2 characters long.";
  }
  if (!email.includes("@")) {
    return "Please enter a valid e-mail address";
  }
  if (password.length < 8) {
    return "Please enter a password with 8 or more characters";
  }
  if (password !== repeatPassword) {
    return "Entered passwords should match!";
  }

  return "Success";
};

const validationLogin = (email, password) => {
  if (!email.includes("@")) {
    return "Please enter a valid e-mail address";
  }
  if (password.length < 8) {
    return "Please enter a password with 8 or more characters";
  }
  return "Success";
};

exports.postSignup = (req, res, next) => {
  const { name, email, password, repeatPassword } = req.body;

  const validationResult = validationSignUp(
    name,
    email,
    password,
    repeatPassword
  );

  if (validationResult !== "Success") {
    return res.status(400).send(validationResult);
  }

  User.findOne({
    email: email,
  })
    .then((userInfo) => {
      if (userInfo) {
        return res.status(400).send("User already exists.");
      }
      const SALT_WORK_FACTOR = 10;
      bcrypt.genSalt(SALT_WORK_FACTOR).then((salt) => {
        bcrypt
          .hash(password, salt)
          .then((hashedPassword) => {
            const user = new User({
              name: name,
              email: email,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((result) => {
            transporter.sendMail({
              to: email,
              from: "hello@mendokusai.app",
              subject: "Signup succeeded!",
              html: "<h1>You successfully signed up!</h1>",
            });
            return res.status(200).send("User successfully signed up.");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server Error");
    });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  const validationResult = validationLogin(email, password);

  if (validationResult !== "Success") {
    return res.status(400).send(validationResult);
  }

  try {
    User.findOne({
      email: email,
    }).then((userInfo) => {
      if (!userInfo) {
        return res
          .status(400)
          .send("User with this email address does not exist.");
      }

      bcrypt.compare(password, userInfo.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).send("Wrong password.");
        }

        generateToken(res, userInfo.id, userInfo.name);
        res.json({ id: userInfo.id, name: userInfo.name });
      });
    });
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

exports.getMe = (req, res, next) => {
  try {
    const user = User.findById({ id: req.user.id }).populate("user", ["name"]);
    res.json(user);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};
