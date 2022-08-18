import SignController from "./SignController";
import VerifyController from "./VerifyController";
import config from "../config";

const signController = new SignController(config.jwt.key);
const verifyController = new VerifyController(config.jwt.key);

export {
    signController,
    verifyController,
}