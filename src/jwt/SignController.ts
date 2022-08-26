import jwt from 'jsonwebtoken';
import { HttpRequest, HttpResponse, HttpController, HttpStatusCodes } from '../web/types';

export default class SignController implements HttpController {

    private secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    execute(httpRequest: HttpRequest): HttpResponse {

        try {
            const { body } = httpRequest;

            const token = jwt.sign(body, this.secretKey);

            return {
                statusCode: HttpStatusCodes.OK,
                body: {
                    token: token,
                }
            }

        } catch (error: any) {
            return {
                statusCode: HttpStatusCodes.INTERNAL_ERROR,
                body: {
                    error: error.message,
                }
            }
        }

    }
}