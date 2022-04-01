const express = require('express');
const config = require('../config');
const { expressAdapter, expressOAuthAdapter } = require('./adapters');
const { 
  jwtSignController, 
  jwtVerifyController, 
  githubOAuthController } = require('./auth');

const app = express();

app.use(express.json());

app.post('/jwt/sign', expressAdapter({
  controller: jwtSignController,
}));
app.post('/jwt/verify', expressAdapter({
  controller: jwtVerifyController,
}));

//OAuth
//Github
app.get('/oauth/github', expressOAuthAdapter({
  controller: githubOAuthController,
}));

app.get('/oauth/github/cb', (req, res) => {
  const { code } = req.query;
  res.status(201).json({ code });
});

app.listen(config.port, () => {
  console.log(`app started at ${config.port}`);
});