import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET fehlt!");
}

export function checkAuth(req, res, next) {
  try {
    const token = req.cookies.token;

    // überprüfen, ob es überhaupt einen Token gibt
    if (!token) {
      return res.status(401).json({ msg: "Nicht eingeloggt!" });
    }

    // wenn ja, ist der Token gültig?
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // damit erweitere ich das req-objekt um den user

    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ msg: "Der Token ist ungültig!" });
  }
}
