import PropTypes from "prop-types";
import {
  CardBody,
  CardFooter,
  Card as ChakraCard,
  Image,
  Stack,
  Text,
  Button,
  Divider,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import { FaRegClock } from "react-icons/fa6";
import { AiOutlineDollar } from "react-icons/ai";

const RetailersCard = (props) => {
  const {
    name,
    status,
    openTime,
    closeTime,
    location,
    gmaps,
    contactprofileImage,
    profileImage,
    bgImage,
    description,
  } = props;

  return (
    <ChakraCard maxW="sm" boxShadow="lg">
      <CardBody>
        <Image
          src={bgImage}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <FaRegClock />
              <p className="text-lg font-medium ml-2">15.00 - 16.00</p>
            </div>
            <div className="flex items-center justify-start">
              <AiOutlineDollar />
              <p className="text-lg font-medium ml-2">Rp. 5.000</p>
            </div>
          </div>
          <Text>{description}</Text>
        </Stack>
      </CardBody>
      <div>
        <Divider />
      </div>
      <CardFooter className="flex items-center justify-between">
        <section className="flex items-center">
          <Avatar name="Dan Abrahmov" src={profileImage}>
            <AvatarBadge
              borderColor="papayawhip"
              bg="tomato"
              boxSize="1.25em"
            />
          </Avatar>
          <p className="text-lg font-semibold ml-4">{name}</p>
        </section>
        <Button variant="solid" colorScheme="blue">
          Cek
        </Button>
      </CardFooter>
    </ChakraCard>
  );
};

RetailersCard.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
    openTime: PropTypes.string,
    closeTime: PropTypes.string,
    location: PropTypes.string,
    gmaps: PropTypes.string,
    contactprofileImage: PropTypes.string,
    bgImage: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default RetailersCard;
