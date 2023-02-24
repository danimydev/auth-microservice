# auth-microservice
This is a node js microservice that you can setup on whichever port you delated in the .env file, it provides routes for both multiple authentication strategies such as jsonwebtokens and oauth.

## Requirements
You must have a node js version installed (greater than 14).

## Install
Just clone the repository and create a **.env** with your preferences following the example file. remember that in order to use oauth routes, you must go to the provider you want and create a new app.

**.env.example**
```
PORT=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_AUTH_CALLBACK_URL=
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
npm run start:dev

```

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
    
    - **GET /login**
        - redirects the client to github authorization page, after accepting it will go back and respond with the auth code obtained.
    
## Collaborate
Feel free to fork this project and collaborate with me!