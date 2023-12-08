import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  CardBody,
  CardFooter,
  Card as ChakraCard,
  Stack,
  Badge,
  Divider,
} from "@chakra-ui/react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import { FaRegClock } from "react-icons/fa6";
import { IoIosContact } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { cutSentence, timeIndonesia } from "../../helpers/StringHelpers";

const RetailersCard = ({
  id,
  name,
  status,
  open_time,
  close_time,
  description,
  location,
  gmaps,
  contact,
  image,
}) => {
  const retailerImage = `${GLOBAL_ROUTE}/img/${
    image ? `retailers/${image}` : "meals/pexels-engin-akyurt-1907642.jpg"
  }`;

  const convertedTime = `${timeIndonesia(open_time)} WIB - ${timeIndonesia(
    close_time,
  )} WIB`;

  const statusColor = (status) => {
    const statusHandler = status === "active";
    return {
      color: statusHandler ? "green" : "red",
      status: statusHandler ? "Buka" : "Tutup",
    };
  };

  return (
    <ChakraCard
      boxShadow="md"
      className="mb-5 md:mb-0 hover:scale-105 transition-all ease-in-out duration-300"
    >
      <Link to={`/retailers/${id}`}>
        <div
          className="relative bg-no-repeat bg-center bg-cover pt-32 pb-3 rounded-t-lg px-5"
          style={{
            backgroundImage: `url(${retailerImage})`,
          }}
        >
          <div className="flex justify-end">
            <Badge colorScheme={statusColor(status).color}>
              {statusColor(status).status}
            </Badge>
          </div>
        </div>
      </Link>
      <CardBody>
        <Stack mt="2" spacing="3" className="flex flex-col justify-between">
          <Link to={`/retailers/${id}`}>
            <h2 className="text-xl font-semibold hover:text-[#48AF4A] transition-all ease-in duration-100">
              {name}
            </h2>
          </Link>
          <div className="flex items-center justify-start">
            <FaRegClock />
            <p className="text-sm font-medium ml-2">{convertedTime}</p>
          </div>
          <p className="text-sm">
            {description ? cutSentence(description, 20) : "Tidak ada deskripsi"}
          </p>
        </Stack>
      </CardBody>
      <div>
        <Divider />
      </div>
      <CardFooter className="flex items-center justify-between">
        <section className="flex items-center">
          <MdOutlineLocationOn />
          <Link to={gmaps ? gmaps : `/retailers/${id}`} target="_blank">
            <p className="text-sm ml-1">{location}</p>
          </Link>
        </section>
        <section className="flex items-center">
          <IoIosContact />
          <p className="text-sm ml-1">{contact}</p>
        </section>
      </CardFooter>
    </ChakraCard>
  );
};

RetailersCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["active", "inactive"]).isRequired,
  open_time: PropTypes.string.isRequired,
  close_time: PropTypes.string.isRequired,
  description: PropTypes.string,
  location: PropTypes.string.isRequired,
  gmaps: PropTypes.string,
  contact: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default RetailersCard;
