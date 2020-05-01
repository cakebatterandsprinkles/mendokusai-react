const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const User = require("../models/User");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  })
);

const validation = (name, email, password, repeatPassword) => {
  if (name.length < 2) {
    return "Username must be at least 2 characters long."
  }
  if (!email.includes("@")) {
    return "Please enter a valid e-mail address";
  }
  if (password.length < 8) {
    return 'Please enter a password with 8 or more characters';
  }
  if (password !== repeatPassword) {
    return 'Entered passwords should match!';
  }

  return "Success";
}

exports.postSignup = (req, res, next) => {
  const {
    name,
    email,
    password,
    repeatPassword
  } = req.body;

  const validationResult = validation(name, email, password, repeatPassword);

  if (validationResult !== "Success") {
    return res.status(400).send(validationResult);
  }

  User.findOne({
      email: email
    }).then(userInfo => {
      if (userInfo) {
        return res.status(400).send("User already exists.");
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
          });
          return user.save();
        })
        .then(result => {
          transporter.sendMail({
            to: email,
            from: 'hello@mendokusai.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
          });

          return res.status(200).end();
        })
        .catch(err => {
          console.log(err);
        });

    })
    .catch(err => {
      console.log(err);
    });
}