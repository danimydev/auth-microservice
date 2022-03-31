const express = require('express');
const { port } = require('../config');
const { expressAdapter } = require('./adapters');
const { jwtSignController, jwtVerifyController } = require('./auth');

const app = express();

app.use(express.json());

app.post('/jwt/sign', expressAdapter({
  controller: jwtSignController,
}));
app.post('/jwt/verify', expressAdapter({
  controller: jwtVerifyController,
}));

app.listen(port, () => {
  console.log(`app started at ${port}`);
});