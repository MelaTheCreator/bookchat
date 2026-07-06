import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-[var(--color-yellow)] text-[var(--color-black)] shadow-sm">
      <div className="mx-auto flex max-w-9xl flex-col gap-4 px-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link to="/" className="text-4xl font-semibold tracking-tight">
          GutenTalk
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-lg">
          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-full border border-slate-900/10 bg-white/80 px-4 py-2 text-slate-900 transition hover:bg-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full border border-slate-900/10 bg-slate-900/10 px-4 py-2 text-slate-900 transition hover:bg-slate-100"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg">Hello {user.username}!</span>
              <button
                onClick={logout}
                className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
