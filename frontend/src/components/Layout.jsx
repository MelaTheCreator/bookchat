import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-black)]">
      <Header />
      <main className="mx-auto max-w-9xl min-h-[calc(100vh-185px)] px-3 py-10 sm:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
