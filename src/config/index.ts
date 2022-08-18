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
  host: process.env.HOST || 'http://localhost',
  jwt: {
    key: process.env.JWT_KEY || 'secret',
  },
}

export default envConfig;