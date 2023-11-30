import { Container } from "@chakra-ui/react";

const HeroFirst = () => {
  return (
    <div
      className="relative bg-no-repeat bg-center bg-cover pt-80 pb-20"
      style={{ backgroundImage: `url(https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg)` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <Container maxW={"7xl"}>
        <h1 className="font-semibold text-6xl max-w-4xl text-white drop-shadow-lg relative z-10">
          About us
        </h1>
      </Container>
    </div>
  );
};

export default HeroFirst;
