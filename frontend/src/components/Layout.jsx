import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="layout flex flex-col h-full">
      <Header />
      <main className="layout-main bg-[#fafaf7] flex-1 p-8">{children}</main>
      <Footer />
    </div>
  );
}
