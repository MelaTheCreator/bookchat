import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header flex items-center justify-between bg-[var(--color-yellow)] p-8 text[var(--color-black)]">
      <h1 className="header-logo text-5xl m-0">GutenTalk</h1>
      <nav className="header-nav flex gap-4 items-center text-2xl">
        {!user && (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="header-link no-underline hover:underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="header-link no-underline hover:underline"
            >
              Register
            </Link>
          </div>
        )}

        {user && (
          <div>
            <span className="header-user mr-4">Hello {user.username}!</span>
            <button
              onClick={logout}
              className="header-button bg-[var(--color-black)] text-[var(--color-text-light)] border-0 px-4 py-2 cursor-pointer rounded-3xl hover:bg-[var(--color-white)] hover:text-[var(--color-text)]"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
