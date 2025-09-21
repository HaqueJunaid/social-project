import { Router } from "express";
import { addFood, getFood, getFoodById } from "../controllers/foodController.js";
import { checkPartner } from "../middlewares/checkPartner.js";
import upload from "../utils/multerSetup.js";
const foodRouter = Router();

foodRouter.post("/", checkPartner, upload.single("video"), addFood);
foodRouter.get("/", getFood);
foodRouter.get("/:partnerId", getFoodById);

export default foodRouter;