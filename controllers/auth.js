const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const User = require("../models/User");
const generateToken = require("../util/generateToken");
const path = require("path");

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

const emailBody = `<div>
                    <img src="cid:logo@mendokusai.app"/>
                    <p style="font-size:1.2rem;"> You successfully signed up! </p> 
                    <p>Click the following link to verify your email address:</p>
                    <a href="www.google.com">www.google.com</a>
                    <p style="font-size:.8rem;">Mendokusai Team</p>
                  </div>`;

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
          .then(() => {
            transporter
              .sendMail({
                to: email,
                from: "hello@mendokusai.app",
                subject: "You just signed up to mendokusai app!",
                attachments: [
                  {
                    filename: "girl3.png",
                    path: __dirname + "/assets/girl3.png",
                    cid: "logo@mendokusai.app",
                  },
                ],
                html: emailBody,
              })
              .then(
                () => {},
                (error) => {
                  console.error(error);

                  if (error.response) {
                    console.error(error.response.body);
                  }
                }
              );
            return res.status(200).send("User successfully signed up!");
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

exports.postLogout = (req, res, next) => {
  try {
    res.clearCookie("token").end();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

exports.postSettings = (req, res, next) => {
  const { name, currentPassword, newPassword, repeatNewPassword } = req.body;

  if (repeatNewPassword !== "" || currentPassword !== "") {
    if (newPassword !== repeatNewPassword) {
      return res.status(400).send("New passwords do not match.");
    }

    if (newPassword.length < 8) {
      return res.status(400).send("Password must have at least 8 characters.");
    }
  }

  try {
    User.findOne({
      _id: req.user.id,
    }).then((userInfo) => {
      if (!userInfo) {
        return res.status(400).send("User with this id does not exist.");
      }

      if (
        newPassword === "" ||
        repeatNewPassword === "" ||
        currentPassword === ""
      ) {
        userInfo.name = name;
        userInfo.save();
        return res.status(200).end();
      }

      bcrypt.compare(currentPassword, userInfo.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).send("Your current password is wrong.");
        }

        const SALT_WORK_FACTOR = 10;
        bcrypt.genSalt(SALT_WORK_FACTOR).then((salt) => {
          bcrypt
            .hash(newPassword, salt)
            .then((hashedPassword) => {
              userInfo.name = name;
              userInfo.password = hashedPassword;
              userInfo.save();
            })
            .then(() => {
              return res.status(200).end();
            })
            .catch((err) => {
              return res.status(500).json(err.toString());
            });
        });
      });
    });
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

exports.getMe = (req, res, next) => {
  User.findById({ _id: req.user.id }, "name", function (err, user) {
    if (err) {
      return res.status(500).json(err.toString());
    }
    if (!user) {
      return res.status(401).end();
    }
    res.json(user.name);
  });
};
