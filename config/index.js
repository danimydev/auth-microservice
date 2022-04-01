require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  jwtKey: process.env.JWT_KEY,
  oauth:{
    github:{
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirectUrl: `${process.env.HOST}:${process.env.PORT}/oauth/github/cb`,
      requestBaseUrl: process.env.GITHUB_REQUEST_BASE_URL,
    }
  }
}