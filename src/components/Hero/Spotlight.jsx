import { Link } from "react-router-dom";
import { Container } from "@chakra-ui/react";

const Spotlight = () => {
  return (
    <div
      className="relative bg-contain bg-no-repeat bg-center md:bg-cover pt-72 pb-28"
      style={{ backgroundImage: `url(/ezgif-3-cee9239c3a.gif)` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Container maxW={"7xl"}>
        <h1 className="font-semibold text-7xl max-w-4xl text-white drop-shadow-lg relative z-10">
          Turahan: Kurangi Limbah Makanan Bersama-sama!
        </h1>
        <section className="relative z-10 mt-8">
          <div className="flex">
            <Link to="/#" className="cursor-pointer mr-5">
              <p className="text-slate-200 hover:text-slate-300 hover:underline">
                Cari Makanan
              </p>
            </Link>
            <Link to="/#" className="cursor-pointer">
              <p className="text-slate-200 hover:text-slate-300 hover:underline">
                Menjadi Mitra
              </p>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Spotlight;
