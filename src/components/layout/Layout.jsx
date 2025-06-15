import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
   return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};


export default Layout;