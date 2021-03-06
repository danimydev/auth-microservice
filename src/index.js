const express = require('express');
const { port } = require('../config');

const jwtRouter = require('./jwt/router');
const oauthRouter = require('./oauth/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/jwt', jwtRouter);
app.use('/oauth', oauthRouter);

app.listen(port, () => {
  console.log(`app started at ${port}`);
});