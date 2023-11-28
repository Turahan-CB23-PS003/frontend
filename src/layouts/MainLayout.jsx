import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <section>
      <Outlet />
      <Footer />
    </section>
  );
};

export default MainLayout;
