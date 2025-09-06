import { Router } from "express";
import { userLogin, userRegister, userLogout, partnerRegister, partnerLogin, partnerLogout } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/user/register", userRegister);
authRouter.post("/user/login", userLogin);
authRouter.get("/user/logout", userLogout);

authRouter.post("/foodPartner/register", partnerRegister);
authRouter.post("/foodPartner/login", partnerLogin);
authRouter.get("/foodPartner/logout", partnerLogout);

export default authRouter;