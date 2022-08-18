import jwt from 'jsonwebtoken';
import { HttpRequest, HttpResponse, HttpController } from '../web/types';

export default class VerifyController implements HttpController {

    private secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    execute(httpRequest: HttpRequest): HttpResponse {

        try {
            const { headers: { authorization } } = httpRequest;
            const bearerToken = authorization.split(' ')[1];

            if (!bearerToken) {
                return {
                    statusCode: 401,
                    body: {
                        error: 'no token passed',
                    }
                }
            }

            const data = jwt.verify(bearerToken, this.secretKey);

            if (!data) {
                return {
                    statusCode: 401,
                    body: {
                        error: 'unauthorized',
                    }
                }
            }

            return {
                statusCode: 200,
                body: {
                    data: data,
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