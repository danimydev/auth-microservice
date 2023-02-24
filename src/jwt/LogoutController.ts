import redisClient from '../redis';
import { HttpController, HttpRequest, HttpResponse, HttpStatusCodes } from "../web/types";

export default class LogoutController implements HttpController {
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

      await redisClient.del(bearerToken);

      return {
        statusCode: HttpStatusCodes.OK,
        body: {
          message: 'succesfull logout'
        },
      }
    } catch (error: any) {
      return {
        statusCode: HttpStatusCodes.INTERNAL_ERROR,
        body: {
          error: error.message,
        },
      }
    }
  }
}
