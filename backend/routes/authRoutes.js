import express from "express";
import { signin, signout, signup } from "../controllers/authController.js";
import loginLimiter from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", loginLimiter, signin);
router.post("/signout", signout);

export default router;
