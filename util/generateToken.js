const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, id, name) => {
  const expiration = 7 * 24 * 60 * 60 * 1000;
  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "7 days",
  });
  return res.cookie("token", token, {
    expires: new Date(Date.now() + expiration),
    secure: false,
    httpOnly: true,
  });
};

const generateRandomString = (length) => {
  var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
    ""
  );
  var result = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (alphabet.length - 1)).toFixed(0);
    result.push(alphabet[j]);
  }
  return result.join("");
};

module.exports = { generateTokenAndSetCookie, generateRandomString };
