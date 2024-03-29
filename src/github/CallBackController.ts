import axios from "axios";
import envConfig from "../config";
import {
  HttpController,
  HttpRequest,
  HttpResponse,
  HttpStatusCodes,
} from "../web/types";

class CallBackController implements HttpController {
  public readonly authCallBackRoute = new URL(envConfig.github.redirectUrl)
    .pathname;

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { code } = httpRequest.query;
      if (!code) {
        return {
          statusCode: HttpStatusCodes.BAD_REQUEST,
          body: "No code passed by github",
        };
      }
      const data = await this.getAccessToken(code);
      return {
        statusCode: HttpStatusCodes.OK,
        body: data,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCodes.INTERNAL_ERROR,
        body: error,
      };
    }
  }

  private async getAccessToken(code: string) {
    const requestBody = {
      client_id: envConfig.github.clientId,
      client_secret: envConfig.github.clientSecret,
      code,
      redirect_uri: envConfig.github.redirectUrl,
    };

    const config = {
      headers: {
        accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "https://github.com/login/oauth/access_token",
      requestBody,
      config
    );

    const user = await this.getUser(data.access_token);

    return { data, user };
  }

  private async getUser(accessToken: string) {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const { data } = await axios.get("https://api.github.com/user", config);

    return {
      username: data.login,
      name: data.name,
      profileImgUrl: data.avatar_url,
    };
  }
}

export default CallBackController;
