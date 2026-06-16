import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Gutenberg Reader</p>
      <Link to="/impressum" style={styles.link}>
        Impressum
      </Link>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "4rem",
    padding: "1rem",
    background: "#222",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};
