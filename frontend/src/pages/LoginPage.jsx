import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    // später ersetzt du das durch echten API-Login
    login({ username: "TestUser" });

    // Weiterleitung zur BookPage
    navigate("/books");
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Test Login</button>
    </div>
  );
}
