import axios from "axios";
import { Request, Response } from "express";
import envConfig from "../config";
import { HttpStatusCodes } from "../web/types";

class GitHubExpressControllers {

  static expressRedirect(req: Request, res: Response) {
    try {
      res.redirect(`https://github.com/login/oauth/authorize?client_id=${envConfig.github.clientId}`);
    } catch (error: any) {
      res.status(HttpStatusCodes.INTERNAL_ERROR).json({ error });
    }
  }

  static redirectCallBackHandler(req: Request, res: Response) {
    try {
      const { code } = req.query;
      console.log({ code });
      const requestBody = {
        client_id: envConfig.github.clientId,
        client_secret: envConfig.github.clientSecret,
        code,
        redirect_uri: envConfig.github.redirectUrl,
      };
      const opts = {
        headers: {
          accept: 'application/json',
        },
      }
      axios
        .post(
          'https://github.com/login/oauth/access_token',
          requestBody,
          opts)
        .then(_res => _res.data)
        .then(data => {
          console.log({ data });
          return res.status(HttpStatusCodes.OK).json({ data })
        });
    } catch (error) {
      res.status(HttpStatusCodes.INTERNAL_ERROR).json({ error });
    }
  }

}

export default GitHubExpressControllers;