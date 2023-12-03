import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <section>
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default MainLayout;
