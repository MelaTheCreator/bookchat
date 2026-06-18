import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <h1 className="header-logo">GutenRead</h1>

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
            <span className="header-user">Hallo, {user.username}</span>
            <button onClick={logout} className="header-button">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
