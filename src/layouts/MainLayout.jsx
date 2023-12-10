import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <section className="mt-auto">
        <Footer />
      </section>
    </section>
  );
};

export default MainLayout;
