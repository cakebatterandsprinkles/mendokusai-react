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

exports.postSignup = (req, res, next) => {
  const {
    name,
    email,
    password,
    repeatPassword
  } = req.body;

  User.findOne({
      email: email
    }).then(userInfo => {
      if (userInfo) {
        return req.flash(
          'error',
          "User already exists"
        );
      }
      if (password.length < 8) {
        return req.flash('error', 'Please enter a password with 8 or more characters');
      }
      if (!email.includes("@")) {
        return req.flash('error', 'Please enter a valid e-mail address');
      }
      if (password !== repeatPassword) {
        return req.flash('error', 'Entered passwords should match!');
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
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from: 'shop@node-complete.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}