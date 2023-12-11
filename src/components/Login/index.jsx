import { useState, useContext } from "react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import UserAuth from "../User/UserAuth";
import LogoImage from "./LogoImage";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  useToast,
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  FormControl,
  InputRightElement,
  chakra,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { userIdToken, setUserIdToken, setUserData } =
    useContext(GlobalContext);
  const { userId, userAccessToken } = userIdToken;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isDataValid, setIsDataValid] = useState(false);
  const [sendData, setSendData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateInput = ({
    email = sendData.email,
    password = sendData.password,
  }) => {
    if (email && password) {
      if (isValidEmail(email)) {
        return true;
      }
    }
    return false;
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    const isDataValid = validateInput({ [name]: value });
    setIsDataValid(isDataValid);
    setSendData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleLoginUser = async () => {
    setButtonLoading(true);
    try {
      const response = await axios.post(`${GLOBAL_ROUTE}api/v1/login`, {
        email: sendData.email,
        password: sendData.password,
      });
      const status = response.data.status === "success";
      const message = response.data.message;
      toast({
        title: status ? "Berhasil!" : "Gagal!",
        description: status ? "Login sukses." : message || "Login gagal.",
        status: status ? "success" : "error",
        duration: 3000,
        isClosable: true,
      });
      if (message) {
        setSendData({
          name: "",
          description: "",
          price: 0,
          status: "active",
          dateProduced: "",
          expiryDate: "",
        });
      }
      if (status) {
        const { id, accessToken } = response.data.data.users;
        Cookies.set("user_id", id);
        Cookies.set("user_accessToken", accessToken);
        setUserIdToken({
          userId: id,
          userAccessToken: accessToken,
        });
        setUserData({});
        navigate("/");
      }
    } catch (error) {
      console.error("Error patching user data:", error);
      toast({
        title: "Login gagal!",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setButtonLoading(false);
  };

  if (userId || userAccessToken) {
    return <UserAuth />;
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="white"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <LogoImage />
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="Blue.50"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={sendData.email}
                    onChange={inputChangeHandler}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={sendData.password}
                    onChange={inputChangeHandler}
                  />
                  <InputRightElement className="mr-2">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                isDisabled={!isDataValid}
                type="submit"
                variant="solid"
                colorScheme="green"
                width="full"
                onClick={handleLoginUser}
                isLoading={buttonLoading}
                loadingText="Memverifikasi..."
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <p className="mt-5">
        Belum punya akun?{" "}
        <Link to="/register" className="text-[#38A169] hover:text-[#2F855A]">
          Yuk Daftar!
        </Link>
      </p>
    </Flex>
  );
};

export default Login;
