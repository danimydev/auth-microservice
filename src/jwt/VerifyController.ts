import jwt from 'jsonwebtoken';
import { HttpRequest, HttpResponse, HttpController, HttpStatusCodes } from '../web/types';

export default class VerifyController implements HttpController {

    execute(httpRequest: HttpRequest): HttpResponse {

        try {
            const { headers: { authorization }, body: { secretKey } } = httpRequest;

            if (!secretKey) {
                return {
                    statusCode: HttpStatusCodes.BAD_REQUEST,
                    body: {
                        error: 'no secret key passed',
                    }
                }    
            }

            const bearerToken = authorization.split(' ')[1];

            if (!bearerToken) {
                return {
                    statusCode: HttpStatusCodes.BAD_REQUEST,
                    body: {
                        error: 'no token passed',
                    }
                }
            }

            const data = jwt.verify(bearerToken, secretKey);

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