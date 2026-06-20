/*
Authentifizierungs-Controller


Dieser Controller verwaltet:
1. Registrierung neuer User:innen
2. Anmeldung bestehender User:innen (Login)
3. Abmeldung (Logout)
4. Abrufen des Profils eines eingeloggten Users

Zur Authentifizierung werden JSON Web Tokens (JWT) verwendet, die nach erfolgreicher Registrierung oder Anmeldung als httpOnly-Cookie gespeichert werden.
*/

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

// Prüfen, ob ein JWT-Secret vorhanden ist
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET fehlt!");
}

// Registrierung von neuen User:innen // funktioniert
// {
//   "username": "Malle26",
//   "email": "malte@test.de",
//   "password": "12345"
// }
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Input validieren, damit undefined und leere Strings NICHT gespeichert werden können // sind alle Pflichtfelder ausgefüllt?
    if (!username || !email || !password) {
      return res.status(400).json({
        msg: "Bitte fülle alle Input-Felder aus!",
      });
    }

    // Prüfen, ob bereits ein Account mit dieser E-Mail existiert
    const userExists = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (userExists) {
      return res.status(400).json({ msg: "Diese:n User:in gibt es schon." });
    }

    // PW vor dem Speichern hashen
    const hashedPW = await bcrypt.hash(password, 12);

    // User:in in die DB aufnehmen
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPW,
    });

    // JWT erzeugt, damit direkt nach der Registrierung ein eingeloggter Zustand besteht
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Token als geschütztes Cookie speichern
    res.cookie("token", token, {
      httpOnly: true,
    });

    // Nicht geheime User:innendaten zurückgeben
    return res.status(201).json({
      msg: "Erfolgreich registriert!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Server-Fehler!" });
  }
};

// Login bestehender User:innen // klappt auch
// {
//   "email": "malte@test.de",
//   "password": "12345"
// }
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // User:in anhand der E-Mail suchen
    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    if (!user) {
      return res.status(401).json({
        msg: "Ungültige Anmeldedaten!",
      });
    }

    // Eingegebenes PW mit dem gespeicherten PW-Hash vergleichen
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        msg: "Ungültige Anmeldedaten!",
      });
    }

    // nach erfolgreicher Anmeldung wird JWT erstellt
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // JWT in Cookie gespeichert
    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.json({
      msg: "Eingelogged :)",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Server-Fehler!" });
  }
};

// Logout der:des aktuellen Userin:Users // geht auch

export const logout = (req, res) => {
  // Cookie mit JWT löschen
  res.clearCookie("token");

  return res.status(200).json({ msg: "Und ausgelogged!" });
};

// Eingeloggt bleiben bzw. Profile der:s aktuellen Userin:Users abrufen
// funktioniert!

export const getProfile = async (req, res) => {
  try {
    // userId stammt aus dem zuvor verifizierten JWT
    const user = await User.findByPk(req.user.userId);

    if (!user) {
      return res.status(401).json({
        msg: "Kein:e autorisierte User:in!",
      });
    }

    // niemals komplette User:innen-Daten zurückgeben (vorher: res.json(user)), weil sonst auch PW-Hash im FE landet.
    return res.json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      msg: "Server-Fehler",
    });
  }
};
