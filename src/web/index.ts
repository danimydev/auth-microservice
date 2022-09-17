import express, { Request, Response } from 'express';
import { HttpRequest, HttpResponse, HttpController } from './types';
import { signController, verifyController } from '../jwt';
import { GitHubOAuth } from '../github';

function adaptRequest(controller: HttpController) {
  return async (req: Request, res: Response) => {

    try {
      const httpRequest: HttpRequest = {
        headers: req.headers,
        params: req.params,
        body: req.body,
      }
      const httpResponse: HttpResponse = await controller.execute(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }

  }
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/health', function (req: Request, res: Response): void {
  res.status(200).json('Hello World');
});

app.post('/jwt/sign', adaptRequest(signController));
app.get('/jwt/verify', adaptRequest(verifyController));

app.get('/github/login', (req, res) => {
  console.log('redirecting to', GitHubOAuth.USER_IDENTITY_URL);
  res.redirect(GitHubOAuth.USER_IDENTITY_URL);
  res.end();
});

app.get('/github/authorize', (req, res) => {
  const code = String(req.query.code);
  const response = GitHubOAuth.getAccessToken(code, GitHubOAuth.REDIRECT_URI);
  res.status(200).json({ response });
});

app.get('/github/redirect', (req, res) => {
  res.status(200).json(req.body);
});

export default app;