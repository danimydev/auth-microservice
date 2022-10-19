import { config } from "dotenv";
config();

type EnvConfig = {
  port: number,
}

const envConfig: EnvConfig = {
  port: Number(process.env.PORT),
}

export default envConfig;