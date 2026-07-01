import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer text-2xl flex items-center justify-between bg-[#F2C94C] p-8 text-black">
      <p className="flex gap-1 items-center justify-center">
        <span className="unicode-copyright">&copy;</span>{" "}
        {new Date().getFullYear()} GutenTalk
      </p>
      <div className="flex gap-4">
        <Link
          to="/impressum"
          className="footer-link text-black  no-underline hover:underline"
        >
          Imprint
        </Link>
        <Link
          to="/datenschutz"
          className="footer-link text-black no-underline hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
