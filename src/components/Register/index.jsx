import { useState, useRef, useContext } from "react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import UserAuth from "../User/UserAuth";
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
  FormLabel,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CMdAlternateEmail = chakra(MdAlternateEmail);

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { userIdToken } = useContext(GlobalContext);
  const { userId, userAccessToken } = userIdToken;
  const [buttonLoading, setButtonLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [isDataValid, setIsDataValid] = useState(false);
  const [sendData, setSendData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordConf: false,
  });

  const handleShowClick = (type) =>
    setShowPassword((prevState) => {
      return {
        ...prevState,
        [type]: !prevState[type],
      };
    });

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateInput = ({
    name = sendData.name,
    email = sendData.email,
    password = sendData.password,
    passwordConf = sendData.passwordConf,
  }) => {
    if (name && email && password && passwordConf) {
      if (isValidEmail(email) && password === passwordConf) {
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

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    const imagePath = URL.createObjectURL(file);
    setImageSrc(imagePath);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleRegisterUser = async () => {
    setButtonLoading(true);
    try {
      const formData = new FormData();
      Object.entries(sendData).forEach(([key, value]) => {
        if (key !== "passwordConf") {
          formData.append(key, value);
        }
      });
      if (imageFile !== "") {
        formData.append("image", imageFile);
      }

      const response = await axios.post(
        `${GLOBAL_ROUTE}api/v1/register`,
        formData,
      );
      const status = response.data.status === "success";
      const message = response.data.message;
      toast({
        title: status ? "Berhasil!" : "Gagal!",
        description: status ? "Register sukses." : message || "Register gagal.",
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
        setImageSrc("");
        setImageFile("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error patching user data:", error);
      toast({
        title: "Register gagal!",
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
        <img src="logo.png" alt="logo" width="200px" />
        <h1 className="text-3xl font-bold">Daftar ke Turahan</h1>
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
                    <CMdAlternateEmail color="gray.300" />
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
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="name"
                    placeholder="Full Name"
                    name="name"
                    value={sendData.name}
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
                    type={showPassword.password ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={sendData.password}
                    onChange={inputChangeHandler}
                  />
                  <InputRightElement className="mr-2">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => handleShowClick("password")}
                    >
                      {showPassword.password ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword.passwordConf ? "text" : "password"}
                    name="passwordConf"
                    placeholder="Konfirmasi Password"
                    value={sendData.passwordConf}
                    onChange={inputChangeHandler}
                  />
                  <InputRightElement className="mr-2">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => handleShowClick("passwordConf")}
                    >
                      {showPassword.passwordConf ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl className="flex items-center my-3">
                <img
                  src={
                    imageSrc
                      ? imageSrc
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="user"
                  className="w-20 h-20 rounded-lg object-cover mr-5 outline outline-slate-200"
                />
                <div>
                  <FormLabel className={isDataValid ? "text-black" : "text-gray-300"}>
                    Gambar Profil
                  </FormLabel>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleButtonClick}
                    isDisabled={!isDataValid}
                  >
                    Ganti Gambar
                  </Button>
                </div>
              </FormControl>
              <Button
                isDisabled={!isDataValid}
                type="submit"
                variant="solid"
                colorScheme="green"
                width="full"
                onClick={handleRegisterUser}
                isLoading={buttonLoading}
                loadingText="Memverifikasi..."
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <p className="mt-5">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-[#38A169] hover:text-[#2F855A]">
          Login di sini.
        </Link>
      </p>
    </Flex>
  );
};

export default Register;
