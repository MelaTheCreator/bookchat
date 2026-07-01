import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header flex items-center justify-between bg-[#F2C94C] p-4 text-black">
      <h1 className="header-logo text-3xl font-bold m-0">GutenReader</h1>
      <nav className="header-nav">
        {!user && (
          <>
            <Link to="/login" className="header-link">
              Login
            </Link>
            <Link to="/register" className="header-link">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="header-user">Hello {user.username}!</span>
            <button onClick={logout} className="header-button">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
