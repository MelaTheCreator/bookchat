import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ImpressumPage from "./pages/ImpressumPage";
import LoginPage from "./pages/LoginPage";
import BookPage from "./pages/BookPage";
// import RegisterPage from "./pages/RegisterPage";
// import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/register" element={<RegisterPage />} /> */}
            <Route path="/books" element={<BookPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
