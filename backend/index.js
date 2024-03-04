import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
