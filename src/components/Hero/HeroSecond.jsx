import { Container, Text } from "@chakra-ui/react";

const HeroSecond = () => {
  return (
    <div
      className="relative bg-no-repeat bg-center bg-cover py-32"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/7262348/pexels-photo-7262348.jpeg)`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Container maxW={"7xl"}>
        <h1 className="font-semibold text-6xl max-w-4xl text-white drop-shadow-lg relative z-10">
          Misi kami
        </h1>
        <Text maxW="2xl" className="mt-6">
          <p className="text-white relative z-10  drop-shadow-lg">
            Setiap misi dirancang sebagai langkah konkret untuk mengatasi
            masalah pemborosan makanan dan meningkatkan keadilan akses makanan,
            dengan tujuan memberikan dampak positif pada lingkungan dan
            masyarakat.
          </p>
        </Text>
      </Container>
    </div>
  );
};

export default HeroSecond;
