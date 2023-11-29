import { Container, Text } from "@chakra-ui/react";

const Commitment = () => {
  return (
    <div className="py-36">
      <Container maxW="7xl">
        <Text maxW="3xl">
          <h2 className="font-bold text-4xl mb-5">Komitmen Kami</h2>
          <p className="font-normal text-xl">
            Turahan berkomitmen untuk misi mengurangi pemborosan makanan dan
            meningkatkan rasa kepedulian. Kami bertekad untuk menghubungkan
            makanan berlebih dari restoran, hotel, dan donatur dengan mereka
            yang membutuhkan.{" "}
          </p>
        </Text>
      </Container>
    </div>
  );
};

export default Commitment;
