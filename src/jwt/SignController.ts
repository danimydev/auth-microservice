import jwt from 'jsonwebtoken';
import { HttpRequest, HttpResponse, HttpController } from '../web/types';

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
                statusCode: 201,
                body: {
                    token: token,
                }
            }

        } catch (error: any) {
            return {
                statusCode: 500,
                body: {
                    error: error.message,
                }
            }
        }

    }
}