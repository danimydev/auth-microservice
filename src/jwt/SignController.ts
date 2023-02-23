import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import {
  HttpRequest,
  HttpResponse,
  HttpController,
  HttpStatusCodes,
} from "../web/types";

export default class SignController implements HttpController {
  execute(httpRequest: HttpRequest): HttpResponse {
    try {
      const { body } = httpRequest;

      if (!body) {
        return {
          statusCode: HttpStatusCodes.BAD_REQUEST,
          body: {
            error: "body must be non empty json",
          },
        };
      }

      const secretKey = crypto.randomBytes(48).toString("hex");
      const token = jwt.sign(body, secretKey);

      return {
        statusCode: HttpStatusCodes.OK,
        body: {
          token,
          secretKey,
        },
      };
    } catch (error: any) {
      return {
        statusCode: HttpStatusCodes.INTERNAL_ERROR,
        body: {
          error: error.message,
        },
      };
    }
  }
}
