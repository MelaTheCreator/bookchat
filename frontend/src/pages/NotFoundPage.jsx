import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate("/", { replace: true });
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Website not found</h2>
      <p>You will be redirected...</p>
    </div>
  );
}
