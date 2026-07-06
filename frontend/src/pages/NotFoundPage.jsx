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
    <div className="mx-auto flex min-h-[calc(100vh-150px)] items-center justify-center px-6 py-10 text-center">
      <div className="rounded-[28px] border border-slate-200 bg-white/90 p-10 shadow-sm">
        <h2 className="text-3xl font-semibold text-slate-900">
          Website not found
        </h2>
        <p className="mt-4 text-slate-600">You will be redirected...</p>
      </div>
    </div>
  );
}
