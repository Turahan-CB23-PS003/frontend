import PropTypes from "prop-types";
import {
  CardBody,
  CardFooter,
  Card as ChakraCard,
  Stack,
  Divider,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import numeral from "numeral";
import GLOBAL_ROUTE from "../../../helpers/GlobalRoute";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { IoIosContact } from "react-icons/io";
import { cutSentence, timeIndonesia } from "../../../helpers/StringHelpers";

const MealsCard = ({ name, description, price, image, retailer }) => {
  const mealImage = `${GLOBAL_ROUTE}/img/meals/${
    image ? image : "pexels-engin-akyurt-1907642.jpg"
  }`;

  const retailerImage = retailer.image
    ? `${GLOBAL_ROUTE}/img/retailers/${retailer.image}`
    : "";

  const convertedTime = `${timeIndonesia(
    retailer.open_time,
  )} WIB - ${timeIndonesia(retailer.close_time)} WIB`;

  const convertedPrice = `Rp${String(numeral(price).format("0,0")).replace(
    ",",
    ".",
  )}`;

  return (
    <ChakraCard boxShadow="md" className="mb-6 md:mb-0">
      <div
        className="relative bg-no-repeat bg-center bg-cover pt-12 pb-6 rounded-t-lg px-5"
        style={{
          backgroundImage: `url(${mealImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60 rounded-t-lg"></div>
        <section className="flex items-center relative z-10">
          <Avatar
            name="Dan Abrahmov"
            src={retailerImage}
            className="drop-shadow-lg"
          >
            <AvatarBadge
              borderColor="papayawhip"
              bg={retailer.status === "active" ? "teal" : "tomato"}
              boxSize="1.25em"
            />
          </Avatar>
          <p className="text-lg text-white font-semibold ml-4 drop-shadow-lg">
            {retailer.name}
          </p>
        </section>
      </div>
      <CardBody>
        <Stack mt="1" spacing="3">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm">{cutSentence(description, 15)}</p>
          <section className="flex items-center">
            <MdOutlineLocationOn />
            <p className="text-sm ml-1">{retailer.location}</p>
          </section>
          <section className="flex items-center">
            <IoIosContact />
            <p className="text-sm ml-1">{retailer.contact}</p>
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
          <p className="text-lg font-medium ml-2">{convertedPrice}</p>
        </div>
      </CardFooter>
    </ChakraCard>
  );
};

MealsCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  retailer: PropTypes.object,
};

export default MealsCard;
