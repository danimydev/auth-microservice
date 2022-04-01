const SignController = require('./controllers/SignController');
const VerifyController = require('./controllers/VerifyController');
const { jwtStrategy } = require('./strategies');

const jwtVerifyController = new VerifyController(jwtStrategy);
const jwtSignController = new SignController(jwtStrategy);

module.exports = {
  jwtVerifyController,
  jwtSignController,
}