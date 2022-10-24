import express, { Request, Response } from 'express';
import { signController, verifyController } from '../jwt';
import adaptRequest from './adapter';

const app = express();

app.use(express.json());

app.use('/health', (req: Request, res: Response): void => {
  res.status(200).json('Hello World');
});

app.post('/jwt/sign', adaptRequest(signController));
app.post('/jwt/verify', adaptRequest(verifyController));

export default app;