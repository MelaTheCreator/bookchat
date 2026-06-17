import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>GutenRead</h1>

      <nav style={styles.nav}>
        {!user && (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <span style={styles.user}>Hallo, {user.username}</span>
            <button onClick={logout} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    padding: "1rem",
    background: "#222",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nav: {
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  button: {
    background: "crimson",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
  user: {
    marginRight: "1rem",
  },
};
