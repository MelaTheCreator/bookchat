import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config.js";

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

    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.msg || "Login fehlgeschlagen");
      return;
    }

    login(data.user);
    navigate("/books");
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-150px)] max-w-md flex-col justify-center px-6 py-10">
      <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-amber-100"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-amber-100"
          />
          <button
            className="w-full rounded-full bg-[var(--color-yellow)] px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[var(--color-yellow-80)]"
            type="submit"
          >
            Login
          </button>
          {error && <p className="text-sm text-rose-600">{error}</p>}
        </form>
      </div>
    </main>
  );
}
