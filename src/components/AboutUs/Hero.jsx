import { Container, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="relative bg-no-repeat bg-center bg-cover pt-52 pb-36"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 to-black/30"></div>
      <Container maxW="6xl">
        <section className="px-2 md:px-0">
          <h1 className="font-bold text-4xl lg:text-6xl max-w-xl text-white drop-shadow-lg relative z-10">
            Turahan, Berdayakan sisa, kurangi limbah makanan bersama-sama!
          </h1>
          <div className="flex items-center">
            <Link to="/meals">
              <Button className="mt-5 mr-3" colorScheme="green">
                Cari Makanan
              </Button>
            </Link>
            <Link to="/retailers">
              <Button className="mt-5 mr-3" colorScheme="teal">
                Cari Tempat
              </Button>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Hero;
