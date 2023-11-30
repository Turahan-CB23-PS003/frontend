import { Container, Text } from "@chakra-ui/react";
import CommitmentExpand from "./CommitmentExpand";

const Commitment = () => {
  return (
    <div className="py-20">
      <Container maxW="7xl">
        <Text maxW="3xl">
          <h2 className="font-semibold text-3xl mb-5 text-[#333333]">
            Berdayakan sisa, kurangi limbah makanan bersama-sama!
          </h2>
          <p className="font-light text-md">
            Turahan berkomitmen untuk misi mengurangi pemborosan makanan dan
            meningkatkan rasa kepedulian. Kami bertekad untuk menghubungkan
            makanan berlebih dari restoran, hotel, dan donatur dengan mereka
            yang membutuhkan. Komitmen kami melibatkan pembentukan komunitas
            yang peduli dan bersedia berbagi, memastikan setiap sisa hidangan
            menjadi peluang untuk kebaikan.
          </p>
        </Text>
        <CommitmentExpand />
      </Container>
    </div>
  );
};

export default Commitment;
