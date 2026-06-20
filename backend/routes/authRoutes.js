import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/authController.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout); // hier keine middleware checkAuth, damit logout unter allen umständen funktioniert

// route für aktuelle:n user:in, um eingelogged zu bleiben
router.get("/profile", checkAuth, getProfile);

export default router;
