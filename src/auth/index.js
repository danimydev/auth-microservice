const SignController = require('./controllers/SignController');
const VerifyController = require('./controllers/VerifyController');
const OAuthController = require('./controllers/OAuthController');
const { jwtStrategy, gitHubOAuthStrategy } = require('./strategies');

const jwtVerifyController = new VerifyController(jwtStrategy);
const jwtSignController = new SignController(jwtStrategy);

const githubOAuthController = new OAuthController(gitHubOAuthStrategy);

module.exports = {
  jwtVerifyController,
  jwtSignController,
  githubOAuthController,
}