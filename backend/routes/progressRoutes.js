import express from "express";
import {
  getProgress,
  saveProgress,
} from "../controllers/progressController.js";

import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/:bookId", checkAuth, getProgress); // GET /api/progress/BOOK_UUID

router.post("/", checkAuth, saveProgress); // POST api/progress

export default router;
