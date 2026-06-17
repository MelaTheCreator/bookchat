import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} GutenRead</p>
      <Link to="/impressum" style={styles.link}>
        Imprint
      </Link>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "4rem",
    padding: "1rem",
    background: "#2c09f1",
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
