require('dotenv').config();

export default {
  port: process.env.PORT,
  host: process.env.HOST,
  jwt: {
    key: process.env.JWT_KEY,
    defaultExp: process.env.JWT_DEFAULT_EXP,
  },
  oauth: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirectUrl: `${process.env.HOST}:${process.env.PORT}/oauth/github/cb`,
      baseUrl: process.env.GITHUB_OAUTH_BASE_URL,
    }
  }
}