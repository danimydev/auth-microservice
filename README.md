# auth-microservice
This is a tiny node js microservice that runs on whichever port you set on the .env file, it provides routes for both signing and verifying data

## Requirements
You must have a node js version installed (greater than 14).

## Install
Just clone the repository and fill the **.env** with your preferences
```
PORT
JWT_KEY
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
Now you can use it! It allows you to hit make http calls to localhost:<PORT>
Routes:
  
  **/sign**
  
    - body
      - data: An object that represents the data you want to sign (register).
      - exp: An expiration time you want to passed.
  
  **/verify**
  
    - headers
      - authorization: A bearer token.
  
## Examples
Sign or register data
Request
```
curl --location --request POST 'localhost:3000/sign' \
--header 'Content-Type: application/json' \
--data-raw '{
    "data": {
        "email":"test@gmail.com",
        "password":"123456"
    },
    "exp":"10000"
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
    "user": {
        "email": "test@gmail.com",
        "password": "123456",
        "iat": 1648437100,
        "exp": 1648440700
    }
}
```
## Collaborate
Feel free to fork this project and collaborate with me!


