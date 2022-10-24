import express, { Request, Response } from 'express';
import { signController, verifyController } from '../jwt';
import { controllerAdapter, redirectAdapter } from './adapter';
import { callbackController, loginAuthUrl } from '../github';

const app = express();

app.use(express.json());

app.use('/health', (req: Request, res: Response): void => {
  res.status(200).json('Hello World');
});

app.post('/jwt/sign', controllerAdapter(signController));
app.post('/jwt/verify', controllerAdapter(verifyController));

app.get('/oauth/github/login', redirectAdapter(loginAuthUrl));
app.get(callbackController.authCallBackRoute, controllerAdapter(callbackController));

export default app;