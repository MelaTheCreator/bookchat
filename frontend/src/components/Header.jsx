import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header flex items-center justify-between bg-[#F2C94C] p-8 text-black">
      <h1 className="header-logo text-5xl m-0">GutenTalk</h1>
      <nav className="header-nav flex gap-4 items-center text-2xl">
        {!user && (
          <>
            <Link
              to="/login"
              className="header-link text-black no-underline hover:underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="header-link text-black no-underline hover:underline"
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="header-user mr-4">Hello {user.username}!</span>
            <button
              onClick={logout}
              className="header-button bg-black text-white border-0 px-6 py-2 cursor-pointer rounded-3xl hover:bg-white hover:text-black"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
