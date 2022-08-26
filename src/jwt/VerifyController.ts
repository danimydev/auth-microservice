import jwt from 'jsonwebtoken';
import { HttpRequest, HttpResponse, HttpController, HttpStatusCodes } from '../web/types';

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
                    statusCode: HttpStatusCodes.FORBIDDEN,
                    body: {
                        error: 'no token passed',
                    }
                }
            }

            const data = jwt.verify(bearerToken, this.secretKey);

            if (!data) {
                return {
                    statusCode: HttpStatusCodes.FORBIDDEN,
                    body: {
                        error: 'unauthorized',
                    }
                }
            }

            return {
                statusCode: HttpStatusCodes.OK,
                body: {
                    data: data,
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