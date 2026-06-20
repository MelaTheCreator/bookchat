/* 
Authentifizierungs-Middleware für geschützte Routen

 Verwendet JSON Web Tokens (JWT), die in Cookies gespeichert sind. Nach erfolgreicher Verifizierung werden die Benutzer:innendaten im Request-Objekt unter `req.user` abgelegt.
*/

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Beim Start der Anwendung prüfen, ob der JWT-Secret vorhanden ist. // Ohne Secret können Tokens nicht verifiziert werden.
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET fehlt!");
}

export function checkAuth(req, res, next) {
  try {
    // JWT-Token aus den Cookies auslesen
    const token = req.cookies.token;

    // Überprüfen, ob es überhaupt einen Token gibt
    if (!token) {
      return res.status(401).json({ msg: "Nicht eingeloggt!" });
    }

    // Token verifizieren und User:innendaten entschlüsseln
    const decoded = jwt.verify(token, JWT_SECRET);

    // req-objekt um den user erweitern, damit nachfolgende Routes auf User:inneninfos zugreifen können
    req.user = decoded;
    console.log(req.user);

    // zur Route springen
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ msg: "Der Token ist ungültig!" });
  }
}
