import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const MainLayout = () => {
  return (
    <section>
      <Header />
      <Hero />
      <Outlet />
      <Footer />
    </section>
  );
};

export default MainLayout;
