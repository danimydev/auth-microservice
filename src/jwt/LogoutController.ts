import { HttpController, HttpRequest, HttpResponse } from "../web/types";

export default class LogoutController implements HttpController {
  async execute(request: HttpRequest): Promise<HttpResponse> {
    return {
      body: "TODO",
      statusCode: 201,
    };
  }
}
