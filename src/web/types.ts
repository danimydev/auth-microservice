export type HttpRequest = {
  headers: any;
  params: any;
  body: any;
  query: any;
};

export type HttpResponse = {
  statusCode: number;
  body: any;
};

export interface HttpController {
  execute: (request: HttpRequest) => HttpResponse | Promise<HttpResponse>;
}

export enum HttpStatusCodes {
  "OK" = 200,
  "RESOURCE_CREATED" = 201,
  "FORBIDDEN" = 401,
  "INTERNAL_ERROR" = 500,
  "BAD_REQUEST" = 400,
}
