import { Request, Response } from "express";
import { HttpController, HttpRequest, HttpResponse, HttpStatusCodes } from "./types";

function controllerAdapter(controller: HttpController) {
  return async (req: Request, res: Response) => {
    try {
      const httpRequest: HttpRequest = {
        headers: req.headers,
        params: req.params,
        body: req.body,
        query: req.query,
      }
      const httpResponse: HttpResponse = await controller.execute(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error: any) {
      res.status(HttpStatusCodes.INTERNAL_ERROR).json({
        error: error.message
      });
    }
  }
}

function redirectAdapter(redirectUrl: string) {
  return async (req: Request, res: Response) => {
    try {
      res.redirect(redirectUrl);
    } catch (error: any) {
      res.status(HttpStatusCodes.INTERNAL_ERROR).json({
        error: error.message
      });
    }
  }
}

export {
  controllerAdapter,
  redirectAdapter,
};