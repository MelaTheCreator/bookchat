import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET fehlt!");
}

// Registrierung // funktioniert
// {
//   "username": "Malle26",
//   "email": "malte@test.de",
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

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Server-Fehler!" });
  }
};

// Login
// {
//   "email": "malte@test.de",
//   "password": "12345"
// }
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    if (!user) {
      return res.status(401).json({
        msg: "Ungültige Anmeldedaten!",
      });
    }

    // console.log(user);

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        msg: "Ungültige Anmeldedaten!",
      });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.json({
      msg: "Eingelogged :).",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Server-Fehler!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({ msg: "Und ausgelogged!" });
};
