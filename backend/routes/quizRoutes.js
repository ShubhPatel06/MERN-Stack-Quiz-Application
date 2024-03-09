import express from "express";
import { createQuiz } from "../controllers/quizController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/create", createQuiz);

export default router;
