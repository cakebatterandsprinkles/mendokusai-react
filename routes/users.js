const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  check,
  body,
  validationResult
} = require("express-validator");

// @route  POST /signup
// @desc   Register User
// @access public

router.post('/', [
    check('name', 'Error: name is required')
    .not()
    .isEmpty(),
    check('email', 'Please enter a valid e-mail address')
    .isEmail(),
    check('password', 'Please enter a password with 8 or more characters')
    .isLength({
      min: 8
    }),
    body('repeatPassword').custom((value, {
      req
    }) => {
      if (value !== req.body.password) {
        throw new Error('Entered passwords should match!');
      }
      return true;
    })
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      password
    } = req.body;

    try {
      let user = await User.findOne({
        email: email
      });
      if (user) {
        return res.status(400).json({
          errors: [{
            msg: "User already exists"
          }]
        });
      } else {
        user = new User({
          name,
          email,
          password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        // save the new user
        await user.save();
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  })

module.exports = router;