import { NextFunction, Request, Response } from "express";
import { HttpController, HttpMiddleware, HttpRequest, HttpResponse, HttpStatusCodes } from "./types";

function adaptController(controller: HttpController) {
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
      res.status(HttpStatusCodes.INTERNAL_ERROR).json({
        error: error.message
      });
    }
  }
}

function adaptMiddleware(controller: HttpController) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      
    } catch (error: any) {
      res.status(HttpStatusCodes.INTERNAL_ERROR).json({
        error: error.message
      });
    }
  }
}

export default adaptController;