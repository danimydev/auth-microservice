# auth-microservice
This is a node js microservice that you can setup on whichever port you delated in the .env file, it provides routes for both multiple authentication strategies such as jsonwebtokens and oauth.

## Requirements
You must have a node js version installed (greater than 14).

## Install
Just clone the repository and create a **.env** with your preferences following the example file. remember that in order to use oauth routes, you must go to the provider you want and create a new app.

**.env.example**
```
PORT=
HOST=http://localhost

JWT_KEY=
JWT_DEFAULT_EXP=1h

GITHUB_REQUEST_BASE_URL=https://github.com/login/oauth/authorize
GITHUB_CLIENT_ID=
GITHUB_CLEINT_SECRET=
```
Once you got your .env set run the following command
```
npm install
```
## Usage
Run the project with

```
# Production
npm run start

# Development
npm run dev

```
You will get this output:
```
> auth-microservice@1.0.0 dev
> nodemon src/index.js

[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/index.js`
app started at <PORT>
```
Now you can start using it by making http requests to therese routes, each route represents an strategy of authentication.

Routes:

**/jwt**
  
- **GET /sign**
  
    - body
      - An object that represents the data you want to sign (register).
  
- **GET /verify**
  
    - headers
      - authorization: A Bearer token provided by the previous route.

**/oauth**

- **/github**
    
    - **GET /authorization**
        - redirects the client to github authorization page, after accepting it will go back and respond with the auth code obtained.
    
    - **GET /access_token?code=**
        - request an access token with the authorization code to then request the user info and return it to the client.
  
## Examples
Using jsonwebtokens (jwt)

Request
```
curl --location --request POST 'localhost:3000/jwt/sign' \
--header 'Content-Type: application/json' \
--data-raw '{
        "email":"test@gmail.com",
        "password":"123456"
    }
}'
```
Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2NDg0MzcxMDAsImV4cCI6MTY0ODQ0MDcwMH0.ZM3DcaqnKHvcu19aV-gcJ_cH-dSvGR7SqfmuV2KsAbc"
}
```
  
Verify a registered token
Request
```
curl --location --request POST 'localhost:3000/verify' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2NDg0MzM4NzYsImV4cCI6MTY0ODQzMzg4Nn0.Fd1CIliOLSg94vUh5gnLSocdFpel-6-cZhqGQKR8gXk'
```
Response
```
{
    "data": {
        "email": "test@gmail.com",
        "password": "123456",
        "iat": 1648437100,
        "exp": 1648440700
    }
}
```

## Collaborate
Feel free to fork this project and collaborate with me!