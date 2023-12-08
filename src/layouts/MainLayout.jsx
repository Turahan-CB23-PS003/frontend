import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <section className="pt-20">
        <Outlet />
      </section>
      <section className="mt-auto">
        <Footer />
      </section>
    </section>
  );
};

export default MainLayout;
