import { Router } from "express";
import { addFood } from "../controllers/foodController.js";
import { checkPartner } from "../middlewares/checkPartner.js";
import upload from "../utils/multerSetup.js";
const foodRouter = Router();

foodRouter.post("/", checkPartner, upload.single("video"), addFood);

export default foodRouter;