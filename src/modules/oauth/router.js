const router = require('express').Router();
const githubRouter = require('./github/router');

router.use('/github', githubRouter);

module.exports = router;