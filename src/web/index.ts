import express, { Request, Response } from 'express';
import config from '../config';
import { HttpRequest, HttpResponse, HttpController } from './types';
import { signController, verifyController } from '../jwt';

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

app.listen(config.port, () => {
  console.log(`app started at ${config.port}`);
});