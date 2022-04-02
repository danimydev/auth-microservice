const router = require('express').Router();
const controllers = require('./controllers');

router.get('/sign', controllers.sign);

router.get('/verify', controllers.verify);

module.exports = router;