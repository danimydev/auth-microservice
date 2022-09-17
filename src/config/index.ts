import { config } from "dotenv";
config();

type EnvConfig = {
  port: number,
  host: string,
  jwt: {
    key: string,
  },
  github: {
    clientId: string,
    clientSecret: string,
  }
}

const envConfig: EnvConfig = {
  port: Number(process.env.PORT),
  host: String(process.env.HOST),
  jwt: {
    key: String(process.env.JWT_KEY),
  },
  github: {
    clientId: String(process.env.GITHUB_CLIENT_ID),
    clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
  }
}

export default envConfig;