import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/connectDB.js";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import authRouter from "./routes/authRoutes.js";
import quizRouter from "./routes/quizRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;
const DATABASE_URL = process.env.DATABASE_URL;
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB(DATABASE_URL);

app.use("/api/auth", authRouter);
app.use("/api/quiz", quizRouter);

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
