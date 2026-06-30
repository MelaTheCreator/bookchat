import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} GutenRead</p>
      <Link to="/impressum" className="footer-link">
        Imprint
      </Link>
      <Link to="/datenschutz" className="footer-link">
        Privacy Policy
      </Link>
    </footer>
  );
}
