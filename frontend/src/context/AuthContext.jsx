import { createContext, useState, useContext, useEffect } from "react";
import { API_URL } from "../config.js";

const BASE_URL = API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = nicht eingeloggt
  const [loading, setLoading] = useState(true); // checkt, ob user:in eingeloggt ist // ohne loading kommt ggfs. falscher zustand

  // checkt mein ersten Laden, ob User:in eingeloggt ist im Cookie nach Token
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/auth/profile`, // "https://gutenread-4cle.onrender.com/api/auth/profile"
          {
            credentials: "include",
          },
        );

        if (res.ok) {
          // res.ok ist eingebaute fetch-Eigenschaft
          const userData = await res.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => setUser(userData);

  const logout = async () => {
    await fetch(`${BASE_URL}/api/auth/logout`, {
      // "https://gutenread-4cle.onrender.com/api/auth/logout"
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
