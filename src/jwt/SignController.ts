import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import redisClient from '../redis';
import {
  HttpRequest,
  HttpResponse,
  HttpController,
  HttpStatusCodes,
} from "../web/types";

export default class SignController implements HttpController {
  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
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
      await this.storeUserCredentials(secretKey, token);

      return {
        statusCode: HttpStatusCodes.OK,
        body: {
          token,
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

  private async storeUserCredentials(secretKey: string, token: string) {
    try {
      let tokenAlreadyExist = await redisClient.get(token) !== null;

      if (tokenAlreadyExist) {
        throw new Error('user already signed');
      }

      await redisClient.set(token, secretKey);
    } catch (error) {
      throw error;
    }
  }
}
