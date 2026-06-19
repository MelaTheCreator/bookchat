import express from "express";
import { checkAuth } from "../middleware/checkAuth";

const router = express.Router();

router.get("/:id/text", checkAuth);

export default router;
