import { Container, Text } from "@chakra-ui/react";

const HeroSecond = () => {
  return (
    <Container maxW={"7xl"}>
      <h1 className="font-semibold text-4xl md:text-5xl max-w-4xl">Misi kami</h1>
      <Text maxW="2xl" className="mt-6">
        <p className="font-light">
          Setiap misi dirancang sebagai langkah konkret untuk mengatasi masalah
          pemborosan makanan dan meningkatkan keadilan akses makanan, dengan
          tujuan memberikan dampak positif pada lingkungan dan masyarakat.
        </p>
      </Text>
    </Container>
  );
};

export default HeroSecond;
