import Footer from "./Footer.js";
import Header from "./Header.js";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="main">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
