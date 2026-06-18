import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import User from "../models/User.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/test", checkAuth, async (req, res) => {
  const user = await User.findByPk(req.user.userId);

  res.json(user);
});

export default router;
