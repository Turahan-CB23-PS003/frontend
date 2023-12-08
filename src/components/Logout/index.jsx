import Cookies from "js-cookie";
import { Button } from "@chakra-ui/react";
import { GlobalContext } from "../../App";
import { useContext } from "react";

const Logout = () => {
  const { setUserIdToken } = useContext(GlobalContext);

  const removeCookieHandler = () => {
    Cookies.remove("user_id");
    Cookies.remove("user_accessToken");
    setUserIdToken({
      userId: null,
      userAccessToken: null,
    });
  };

  return (
    <Button colorScheme="red" variant="outline" onClick={removeCookieHandler}>
      Logout
    </Button>
  );
};

export default Logout;
