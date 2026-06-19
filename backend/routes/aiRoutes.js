import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { chat } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", checkAuth, chat);

export default router;
