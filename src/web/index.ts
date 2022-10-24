import express, { Request, Response } from 'express';
import { signController, verifyController } from '../jwt';
import adaptController from './adapter';
import envConfig from '../config';
import GitHubExpressControllers from '../github/controllers';

const app = express();

app.use(express.json());

app.use('/health', (req: Request, res: Response): void => {
  res.status(200).json('Hello World');
});

app.post('/jwt/sign', adaptController(signController));
app.post('/jwt/verify', adaptController(verifyController));

app.get('/oauth/github/login', GitHubExpressControllers.expressRedirect);

app.get(new URL(envConfig.github.redirectUrl).pathname, GitHubExpressControllers.redirectCallBackHandler);

export default app;