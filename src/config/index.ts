import { config } from "dotenv";
config();

const envConfig = {
  port: Number(process.env.PORT),
  github: {
    clientId: String(process.env.GITHUB_CLIENT_ID),
    clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    redirectUrl: String(process.env.GITHUB_AUTH_CALLBACK_URL),
  },
};

export default envConfig;
