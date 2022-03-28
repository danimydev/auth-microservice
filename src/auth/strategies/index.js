const jwt = require('jsonwebtoken');
const JWTAuthStrategy = require('./JWTStrategy');
const { jwtKey } = require('../../../config');

const jwtStrategy = new JWTAuthStrategy({ jwt, secretKey: jwtKey });

module.exports = {
  jwtStrategy,
};