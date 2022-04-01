const jwt = require('jsonwebtoken');
const JWTAuthStrategy = require('./JWTStrategy');
const { jwtKey, oauth } = require('../../../config');
const OAuthStrategy = require('./OAuthStrategy');

const jwtStrategy = new JWTAuthStrategy({ jwt, secretKey: jwtKey });
const gitHubOAuthStrategy = new OAuthStrategy({ config: oauth.github });

module.exports = {
  jwtStrategy,
  gitHubOAuthStrategy,
};