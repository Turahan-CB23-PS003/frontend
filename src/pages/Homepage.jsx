import { Container } from "@chakra-ui/react";
import Hero from "../components/Home/Hero";
import Usage from "../components/Home/Usage";
import FirstMeals from "../components/Home/FirstMeals";
import FirstMission from "../components/Home/FirstMission";

const HomePage = () => {
  return (
    <section>
      <Hero />
      <Container maxW="6xl">
        <div className="px-2 md:px-0 py-20 lg:py-24">
          <Usage />
          <div className="my-24 md:my-32">
            <FirstMission />
          </div>
          <FirstMeals />
        </div>
      </Container>
    </section>
  );
};

export default HomePage;
