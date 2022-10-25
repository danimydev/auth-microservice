import axios from "axios";
import envConfig from "../config";
import { HttpController, HttpRequest, HttpResponse, HttpStatusCodes } from "../web/types";

class CallBackController implements HttpController {

  public readonly authCallBackRoute = new URL(envConfig.github.redirectUrl).pathname;

  constructor() {

  }

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { code } = httpRequest.query;
      if (!code) {
        return {
          statusCode: HttpStatusCodes.BAD_REQUEST,
          body: 'No code passed by github',
        }
      }
      const data = await this.getAccessToken(code);
      return {
        statusCode: HttpStatusCodes.OK,
        body: data,
      }
    } catch (error) {
      return {
        statusCode: HttpStatusCodes.INTERNAL_ERROR,
        body: error,
      }
    }
  }

  private async getAccessToken(code: string) {
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
    const rawResponse = await axios.post('https://github.com/login/oauth/access_token', requestBody, opts);
    return rawResponse.data;
  }
}

export default CallBackController;