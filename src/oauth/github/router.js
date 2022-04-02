const router = require('express').Router();
const controllers = require('./controllers');

router.get('/authorization', controllers.authorization);

router.get('/cb', controllers.authorizationCallback);

router.get('/access_token', controllers.accessToken);

module.exports = router;