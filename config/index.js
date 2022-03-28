require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  jwtKey: process.env.JWT_KEY,
}