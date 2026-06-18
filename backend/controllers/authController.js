import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET fehlt!");
}

// Registrierung
// {
//   "username": "Malle26",
//   "email": "malte@beispiel.de",
//   "password": "12345"
// }
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Input validieren, damit undefined und leere Strings NICHT gespeichert werden können
    if (!username || !email || !password) {
      return res.status(400).json({
        msg: "Bitte fülle alle Input-Felder aus!",
      });
    }

    const userExists = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (userExists) {
      return res.status(400).json({ msg: "Diese:n User:in gibt es schon." });
    }

    const hashedPW = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPW,
    });

    // hier schon JWT zurückgeben, damit User:in sich nach dem Registrieren nicht nochmal separat anmelden muss?
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      token,
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Server-Fehler!" });
  }
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
