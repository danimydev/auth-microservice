import jwt from "jsonwebtoken";
import redisClient from '../redis';
import {
  HttpRequest,
  HttpResponse,
  HttpController,
  HttpStatusCodes,
} from "../web/types";

export default class VerifyController implements HttpController {
  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        headers: { authorization },
      } = httpRequest;

      const [, bearerToken] = authorization.split(" ");

      if (!bearerToken) {
        return {
          statusCode: HttpStatusCodes.BAD_REQUEST,
          body: {
            error: "no bearer token passed",
          },
        };
      }

      const secretKey = await this.getStoredUserSecretKey(bearerToken);

      const data = jwt.verify(bearerToken, secretKey);

      if (!data) {
        return {
          statusCode: HttpStatusCodes.FORBIDDEN,
          body: {
            error: "unauthorized",
          },
        };
      }

      return {
        statusCode: HttpStatusCodes.OK,
        body: { data, },
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

  private async getStoredUserSecretKey(token: string) {
    try {
      const secretKey = await redisClient.get(token);

      if (!secretKey) {
        throw new Error('token is not registered');
      }

      return secretKey;
    } catch (error) {
      throw error;
    }
  }
}
