require('dotenv').config();

type EnvConfig = {
  port: number,
  host: string,
  jwt: {
    key: string,
  },
}

const envConfig: EnvConfig = {
  port: Number(process.env.PORT),
  host: String(process.env.HOST),
  jwt: {
    key: String(process.env.JWT_KEY),
  },
}

export default envConfig;