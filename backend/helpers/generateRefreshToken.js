const jwt = require('jsonwebtoken');

const generateRefreshToken = (user) => {
  return jwt.sign({ ...user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

module.exports = generateRefreshToken;
