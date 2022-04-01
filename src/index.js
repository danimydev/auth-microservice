const express = require('express');
const config = require('../config');
const { expressAdapter } = require('./adapters');
const oauthRouter = require('./modules/oauth/router');
const { 
  jwtSignController, 
  jwtVerifyController } = require('./auth');

const app = express();

app.use(express.json());

app.post('/jwt/sign', expressAdapter({
  controller: jwtSignController,
}));
app.post('/jwt/verify', expressAdapter({
  controller: jwtVerifyController,
}));

app.use('/oauth', oauthRouter);

app.listen(config.port, () => {
  console.log(`app started at ${config.port}`);
});