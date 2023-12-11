import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  CardBody,
  CardFooter,
  Card as ChakraCard,
  Stack,
  Divider,
  Badge,
} from "@chakra-ui/react";
import numeral from "numeral";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { IoIosContact } from "react-icons/io";
import { cutSentence, timeIndonesia } from "../../helpers/StringHelpers";

const MealsCard = ({
  id,
  name,
  description,
  price,
  image,
  status,
  retailer,
}) => {
  const mealImage = `${GLOBAL_ROUTE}img/meals/${
    image ? image : "pexels-engin-akyurt-1907642.jpg"
  }`;

  const retailerImage = `${GLOBAL_ROUTE}img/${
    retailer.image
      ? `retailers/${retailer.image}`
      : "meals/pexels-engin-akyurt-1907642.jpg"
  }`;

  const convertedTime = `${timeIndonesia(
    retailer.open_time,
  )} WIB - ${timeIndonesia(retailer.close_time)} WIB`;

  const convertedPrice = (price) => {
    if (price <= 0) {
      return "Gratis";
    }
    return `Rp${String(numeral(price).format("0,0")).replace(",", ".")}`;
  };

  const statusColor =
    retailer.status === "active"
      ? ["bg-green-400", "bg-green-500"]
      : ["bg-red-400", "bg-red-500"];

  const statusBadge = (status, retailerStatus) => {
    if (retailerStatus === "inactive") {
      return {
        color: "red",
        status: "Penyedia tutup",
      };
    }
    if (status === "inactive") {
      return {
        color: "red",
        status: "Makanan tidak tersedia",
      };
    }
    return {
      color: "green",
      status: "Makanan tersedia",
    };
  };

  return (
    <ChakraCard
      boxShadow="md"
      className="mb-6 md:mb-0 hover:scale-105 transition-all ease-in-out duration-300"
    >
      <div
        className="relative bg-no-repeat bg-center bg-cover pt-16 pb-4 rounded-t-lg px-5"
        style={{
          backgroundImage: `url(${mealImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 rounded-t-lg"></div>
        <section className="flex items-center relative z-10">
          <Link to={`/retailers/${retailer.id}`}>
            <img
              src={retailerImage}
              alt="retailer"
              className="w-10 h-10 rounded-full"
            />
          </Link>
          <span className="relative flex h-3 w-3 right-3 top-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusColor[0]}`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${statusColor[1]}`}
            ></span>
          </span>
          <Link to={`/retailers/${retailer.id}`}>
            <p className="text-lg text-white font-semibold drop-shadow-lg hover:text-[#2F855A] transition-all ease-in duration-100">
              {retailer.name}
            </p>
          </Link>
        </section>
      </div>
      <CardBody>
        <Stack spacing="3">
          <Link to={`/meals/${id}`}>
            <h3 className="font-semibold text-lg hover:text-[#2F855A] transition-all ease-in duration-100">
              {name}
            </h3>
          </Link>
          <p className="text-sm">{cutSentence(description, 15)}</p>
          <Link to={retailer.gmaps ? retailer.gmaps : "./"} target="_blank">
            <section className="flex items-center">
              <MdOutlineLocationOn />
              <p className="text-sm ml-1">{retailer.location}</p>
            </section>
          </Link>
          <section className="flex items-center">
            <IoIosContact />
            <p className="text-sm ml-1">{retailer.contact}</p>
          </section>
          <section className="flex items-center">
            <Badge colorScheme={statusBadge(status, retailer.status).color}>
              {statusBadge(status, retailer.status).status}
            </Badge>
          </section>
        </Stack>
      </CardBody>
      <div>
        <Divider />
      </div>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <FaRegClock />
          <p className="text-sm font-medium ml-2">{convertedTime}</p>
        </div>
        <div className="flex items-center justify-start">
          <AiOutlineDollar />
          <p className="text-lg font-medium ml-2">{convertedPrice(price)}</p>
        </div>
      </CardFooter>
    </ChakraCard>
  );
};

MealsCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  status: PropTypes.oneOf(["active", "inactive"]).isRequired,
  retailer: PropTypes.object,
};

export default MealsCard;
