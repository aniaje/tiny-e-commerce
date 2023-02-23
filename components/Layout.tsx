import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="p-5 ">{children}</div>
      <Footer />
    </div>
  );
}
