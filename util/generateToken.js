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
module.exports = generateTokenAndSetCookie;
