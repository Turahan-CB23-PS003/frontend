import {
  Container,
  Spinner,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GLOBAL_ROUTE from "../helpers/GlobalRoute";
import axios from "axios";
import Cookies from "js-cookie";

const UserProfilePage = () => {
  const userId = Cookies.get("user_id");
  const userAccessToken = Cookies.get("user_accessToken");
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const getUserData = async () => {
        if (userId && userAccessToken) {
          const response = await axios.get(
            `${GLOBAL_ROUTE}/api/v1/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${userAccessToken}`,
              },
            },
          );
          setUserData(response.data.data.users);
          setIsLoading(false);
        }
      };

      getUserData();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userId, userAccessToken]);

  if (!userId || !userAccessToken) {
    return (
      <Container maxW={"6xl"}>
        <section className="flex flex-col justify-center items-center pt-32">
          <h1 className="text-4xl font-bold">You must login first</h1>
          <p>
            Go to{" "}
            <Link
              to="/"
              className="font-semibold text-[#48AF4A] hover:text-[#368237]"
            >
              Home
            </Link>{" "}
            or{" "}
            <Link
              to="/"
              className="font-semibold text-[#48AF4A] hover:text-[#368237]"
            >
              Login
            </Link>
          </p>
        </section>
      </Container>
    );
  }

  const userImage = `${GLOBAL_ROUTE}/img/${
    userData.image
      ? `users/${userData.image}`
      : "meals/pexels-engin-akyurt-1907642.jpg"
  }`;

  if (isLoading) {
    return (
      <Container maxW={"6xl"}>
        <div className="flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      </Container>
    );
  }

  return (
    <Container maxW={"6xl"} className="py-20">
      <img
        src={userImage}
        alt="User Image"
        className="w-52 h-52 rounded-lg object-cover mb-3 mr-5"
      />
      <div>
        <FormControl className="mb-3">
          <FormLabel>Name</FormLabel>
          <Input type="name" disabled value={userData.name} />
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={userData.email} />
        </FormControl>
      </div>
    </Container>
  );
};

export default UserProfilePage;
