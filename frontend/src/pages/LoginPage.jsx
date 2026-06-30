import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

const BASE_URL = API_URL;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const response = await fetch(
      `${BASE_URL}/api/auth/login`, // "https://gutenread-4cle.onrender.com/api/auth/login"
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setError(data.msg || "Login fehlgeschlagen");
      return;
    }

    login(data.user);
    console.log(data.user);
    navigate("/books");
  };

  return (
    <div className="page-wrapper">
      <h2 className="page-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
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
          login
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  );
}
