import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Retailers from "../pages/Retailers";

const MainLayout = () => {
  return (
    <section>
      <Header />
      <Retailers />
      <Outlet />
      <Footer />
    </section>
  );
};

export default MainLayout;
