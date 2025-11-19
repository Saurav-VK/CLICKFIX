
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AdminFooter from "./components/AdminFooter/AdminFooter";
import AdminHeader from "./components/AdminHeader/AdminHeader";

const Layout = () => {
  const role = localStorage.getItem('userRole');

  return (
    <div className="app-layout">
      {role === 'admin' ? <AdminHeader/> : <Header />}

      <main className="main-content">
        <Outlet />
      </main>

      {role === 'admin' ? <AdminFooter /> : <Footer />}
    </div>
  );
};

export default Layout;
