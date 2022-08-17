import express from 'express';
import config from './config';

const jwtRouter = require('./jwt/router');
const oauthRouter = require('./oauth/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/jwt', jwtRouter);
app.use('/oauth', oauthRouter);

app.listen(config.port, () => {
  console.log(`app started at ${config.port}`);
});