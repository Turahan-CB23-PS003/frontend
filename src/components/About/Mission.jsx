import PropTypes from "prop-types";

const Mission = ({ image, title, children }) => {
  return (
    <section className="block md:grid grid-cols-2 gap-12 lg:gap-28 mb-10">
      <img
        src={image}
        className="mb-6 md:mb-0 rounded-3xl w-full h-72 object-cover"
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
