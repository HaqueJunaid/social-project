import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import authRouter from "./Routes/auth.route.js";
import foodRouter from './Routes/food.route.js';
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());
app.use(express.json());    

app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);

export default app;