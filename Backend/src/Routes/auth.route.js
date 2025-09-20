import { Router } from "express";
import { userLogin, userRegister, logOut, partnerRegister, partnerLogin } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/user/register", userRegister);
authRouter.post("/user/login", userLogin);

authRouter.post("/foodPartner/register", partnerRegister);
authRouter.post("/foodPartner/login", partnerLogin);

authRouter.get("/logout", logOut);

export default authRouter;