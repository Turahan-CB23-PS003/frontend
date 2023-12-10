import Cookies from "js-cookie";
import { Button } from "@chakra-ui/react";
import { GlobalContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setUserIdToken, setUserData } = useContext(GlobalContext);
  const navigate = useNavigate();

  const removeCookieHandler = () => {
    Cookies.remove("user_id");
    Cookies.remove("user_accessToken");
    setUserIdToken({
      userId: null,
      userAccessToken: null,
    });
    setUserData({});
    navigate("/");
  };

  return (
    <Button colorScheme="red" variant="outline" onClick={removeCookieHandler}>
      Logout
    </Button>
  );
};

export default Logout;
