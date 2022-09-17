import envConfig from "../config";
import https from 'node:https';

class GitHubOAuth {

    static REDIRECT_URI = `${envConfig.host}:${envConfig.port}/github/redirect`;
    static USER_IDENTITY_URL = `https://github.com/login/oauth/authorize?client_id=${envConfig.github.clientId}`;

    static getAccessToken(code: string, redirectUri: string) {
        const options = {
            hostname: 'github.com',
            path: `/login/oauth/access_token?client_id=${envConfig.github.clientId}&client_secret=${envConfig.github.clientSecret}&code=${code}&redirect_uri=${redirectUri}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
        }
        let response: any;
        const req = https.request(options, res => {
            console.log(res.statusCode);
            res.on('data', d => {
                response += d;
            });
        });
        req.on('error', error => {
            console.log(error);
        });
        req.end();
        return response;
    }

}

export {
    GitHubOAuth,
}