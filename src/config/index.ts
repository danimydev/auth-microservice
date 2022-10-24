import { config } from "dotenv";
config();

type EnvConfig = {
  port: number,
  github: {
    clientId: string,
    clientSecret: string,
    redirectUrl: string,
  }
}

const envConfig: EnvConfig = {
  port: Number(process.env.PORT),
  github: {
    clientId: String(process.env.GITHUB_CLIENT_ID),
    clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    redirectUrl: String(process.env.GITHUB_AUTH_CALLBACK_URL),
  }
}

export default envConfig;