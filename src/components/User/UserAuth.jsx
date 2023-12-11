import { Link, useNavigate } from "react-router-dom";
import { Container, useToast } from "@chakra-ui/react";
import { GlobalContext } from "../../App";
import Cookies from "js-cookie";
import { useContext } from "react";

const UserAuth = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setUserIdToken, setUserData } = useContext(GlobalContext);

  const removeCookieHandler = () => {
    Cookies.remove("user_id");
    Cookies.remove("user_accessToken");
    setUserIdToken((prevState) => {
      return {
        ...prevState,
        userId: null,
        userAccessToken: null,
      };
    });
    setUserData({});
    toast({
      title: "Logout berhasil",
      description: "Kamu telah logout dari aplikasi",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <Container maxW={"6xl"}>
      <section className="flex flex-col justify-center items-center pt-60">
        <h1 className="text-4xl text-center font-bold mb-5">
          Kamu harus logout terlebih dahulu
        </h1>
        <p>
          Pergi ke{" "}
          <Link
            to="/"
            className="font-semibold text-[#38A169] hover:text-[#368237] cursor-pointer"
          >
            Home
          </Link>{" "}
          atau{" "}
          <span
            to="/"
            className="font-semibold text-[#a13838] hover:text-[#823636] cursor-pointer"
            onClick={removeCookieHandler}
          >
            Logout
          </span>
        </p>
      </section>
    </Container>
  );
};

export default UserAuth;
