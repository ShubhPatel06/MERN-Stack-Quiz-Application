import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getCreatedQuizzes,
  updateQuiz,
} from "../controllers/quizController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", getAllQuizzes);
router.post("/create", createQuiz);
router.patch("/update", updateQuiz);
router.get("/myQuizzes", getCreatedQuizzes);

export default router;
