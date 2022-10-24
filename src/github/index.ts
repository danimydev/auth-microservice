import envConfig from "../config";
import CallBackController from "./callbackController";

const callbackController = new CallBackController();
const loginAuthUrl = `https://github.com/login/oauth/authorize?client_id=${envConfig.github.clientId}`;

export {
  loginAuthUrl,
  callbackController,
}