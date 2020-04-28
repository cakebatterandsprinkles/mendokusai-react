const express = require("express");
const router = express.Router();
const User = require("../models/User");
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
  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    res.json("HO HO HO");
  })

module.exports = router;