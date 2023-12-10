import { Container } from "@chakra-ui/react";
import Hero from "../components/AboutUs/Hero";
import Usage from "../components/AboutUs/Usage";
import FirstMeals from "../components/AboutUs/FirstMeals";
import Mission from "../components/AboutUs/Mission";

const AboutUs = () => {
  return (
    <section>
      <Hero />
      <Container maxW="6xl">
        <div className="px-2 md:px-0 py-20 lg:py-24">
          <Usage />
          <div className="my-24">
            <Mission />
          </div>
          <FirstMeals />
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;
