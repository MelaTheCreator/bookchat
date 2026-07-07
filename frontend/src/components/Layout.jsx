import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-paper)] text-[var(--color-black)]">
      <Header />
      <main className="layout-main mx-auto flex-1 max-w-9xl w-full px-3 py-10 sm:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
