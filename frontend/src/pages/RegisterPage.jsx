import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const BASE_URL = API_URL;

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const response = await fetch(
      `${BASE_URL}/api/auth/register`, // "https://gutenread-4cle.onrender.com/api/auth/register"
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // erlaubt cookies
        body: JSON.stringify({ username, email, password }),
      },
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      setError(data.msg || "Registrierung fehlgeschlagen");
      return;
    }

    login(data.user);
    console.log(data.user);
    navigate("/books");
  };

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="page-button" type="submit">
          register
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  );
}
