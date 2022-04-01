require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  jwtKey: process.env.JWT_KEY,
  oauth:{
    github:{
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirectUrl: process.env.GITHUB_REDIRECT_URL,
      requestBaseUrl: process.env.GITHUB_REQUEST_BASE_URL,
    }
  }
}