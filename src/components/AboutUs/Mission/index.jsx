import PropTypes from "prop-types";
import { Container } from "@chakra-ui/react";

const Mission = ({ image, title, children }) => {
  return (
    <Container maxW="7xl" className="pt-24">
      <section className="block md:grid grid-cols-2 gap-12 lg:gap-28">
        <img src={image} className="mb-6 md:mb-0" />
        <div className="flex flex-col justify-center">
          <h2 className="font-semibold text-3xl mb-5 text-[#333333]">
            {title}
          </h2>
          {children}
        </div>
      </section>
    </Container>
  );
};

Mission.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Mission;
