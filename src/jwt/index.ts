import SignController from "./SignController";
import VerifyController from "./VerifyController";
import LogoutController from "./LogoutController";

const signController = new SignController();
const verifyController = new VerifyController();
const logoutController = new LogoutController();

export { signController, verifyController, logoutController };
