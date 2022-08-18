export type HttpRequest = {
    headers: any,
    params: any,
    body: any,
}

export type HttpResponse = {
    statusCode: number,
    body: any,
}

export interface HttpController {
    execute: Function
}