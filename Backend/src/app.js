import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import authRouter from "./Routes/auth.route.js";
import foodRouter from './Routes/food.route.js';
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:3001"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());    

app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);

export default app;