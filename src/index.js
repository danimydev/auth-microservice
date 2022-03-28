const express = require('express');
const { port } = require('../config');
const { expressAdapter } = require('./adapters');
const { jwtSignController, jwtVerifyController } = require('./auth');

const app = express();

app.use(express.json());

app.post('/sign', expressAdapter({
  controller: jwtSignController,
}));
app.post('/verify', expressAdapter({
  controller: jwtVerifyController,
}));

app.listen(port, () => {
  console.log(`app started at ${port}`);
});