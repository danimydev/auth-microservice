const jwt = require('jsonwebtoken');
const config = require('../../config');

function signData(data) {
  try {
    return jwt.sign(data, config.jwt.key, { expiresIn: config.jwt.defaultExp });
  } catch (error) {
    throw new Error('Could not sign income data');
  }
}

function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwt.key);
  } catch (error) {
    throw new Error('Could not verify token');
  }
}

module.exports = {
  signData,
  verifyToken,
}