import { useState } from "react";
import PropTypes from "prop-types";
import { Spinner } from "@chakra-ui/react";

const Mission = ({ image, title, children }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <section className="block md:grid grid-cols-2 gap-12 lg:gap-28 mb-10">
      {!isImageLoaded && (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      )}
      <img
        src={image}
        className="mb-6 md:mb-0 rounded-3xl w-full h-72 object-cover"
        loading="lazy"
        onLoad={handleImageLoad}
      />
      <div className="flex flex-col justify-center">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        {children}
      </div>
    </section>
  );
};

Mission.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Mission;
