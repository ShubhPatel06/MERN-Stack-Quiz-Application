import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getCreatedQuizzes,
} from "../controllers/quizController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", getAllQuizzes);
router.post("/create", createQuiz);
router.get("/myQuizzes", getCreatedQuizzes);

export default router;
