import React from "react";

export default function Dashboard() {
  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>GutenRead</h1>
      <p style={styles.text}>
        This page allows you to load books from the Gutenberg Project and read
        them together with friends.
      </p>
      <p style={styles.text}>
        For each section, an automatically generated chat room is created where
        you can discuss the previous sections live.
      </p>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    lineHeight: 1.6,
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#ee1fa980",
  },
  text: {
    marginBottom: "0.75rem",
  },
};
