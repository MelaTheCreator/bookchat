import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer text-xl flex items-center justify-between bg-[var(--color-yellow)] p-8 text-[var(--color-text)]">
      <p className="flex gap-1 items-center justify-center">
        <span className="unicode-copyright">&copy;</span>{" "}
        {new Date().getFullYear()} GutenTalk
      </p>
      <div className="flex gap-4">
        <Link
          to="/impressum"
          className="footer-link no-underline hover:underline"
        >
          Imprint
        </Link>
        <Link
          to="/datenschutz"
          className="footer-link no-underline hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
