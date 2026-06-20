import { Navigate } from "react-router-dom"; // Komponente von React Router, die beim Rendern eine Navigation auslöst // beschreibt einen Zustand
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Während der Überprüfung des Login-Status nichts rendern (oder Spinner anzeigen),
  // sonst würde bei kurzem initialem `user === null` sofort umgeleitet werden.
  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
