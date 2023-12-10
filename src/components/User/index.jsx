import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Divider,
  useToast,
  Center,
  Show,
  Hide,
} from "@chakra-ui/react";
import { useState, useContext, useRef } from "react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import axios from "axios";
import UserNoAuth from "./UserNoAuth";
import UserPassword from "./UserPassword";
import { GlobalContext } from "../../App";
import UserAlert from "./UserAlert";
import { Link } from "react-router-dom";

const User = () => {
  const { userIdToken, userData, setUserData } = useContext(GlobalContext);
  const { userId, userAccessToken } = userIdToken;
  const [startEdit, setStartEdit] = useState(false);
  const [userInput, setUserInput] = useState({
    name: userData.name,
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserInput((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    if (userInput.name !== "") {
      setCheckInput(true);
    } else {
      setCheckInput(false);
    }
  };

  const startEditHandler = () => {
    setStartEdit((prevState) => !prevState);
  };

  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [checkInput, setCheckInput] = useState(false);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    const imagePath = URL.createObjectURL(file);
    setImageSrc(imagePath);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const toast = useToast();

  const handlePatchUserData = async () => {
    try {
      setButtonLoading(true);
      const formData = new FormData();
      formData.append("name", userInput.name);
      if (imageFile !== "") {
        formData.append("image", imageFile);
      }

      const response = await axios.patch(
        `${GLOBAL_ROUTE}/api/v1/users/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      const status = response.data.status === "success";
      toast({
        title: status ? "Berhasil!" : "Gagal!",
        description: status ? "Data berhasil diubah." : "Data gagal diubah.",
        status: status ? "success" : "error",
        duration: 3000,
        isClosable: true,
      });
      setButtonLoading(false);
      setStartEdit(false);
      if (status) {
        setUserData(response.data.data.users);
      }
    } catch (error) {
      console.error("Error patching user data:", error);
    }
  };

  if (!userId || !userAccessToken) {
    return <UserNoAuth />;
  }

  const userImage = () => {
    if (imageSrc) {
      return imageSrc;
    } else if (userData.image) {
      return `${GLOBAL_ROUTE}/img/users/${userData.image}`;
    }
    return `${GLOBAL_ROUTE}/img/meals/pexels-engin-akyurt-1907642.jpg`;
  };

  return (
    <Container maxW="6xl">
      <h1 className="font-bold text-3xl md:text-5xl mb-5">Profilmu</h1>
      <p className="text-lg mb-16">
        Sesuaikan profil dan passwordmu atau pergi ke{" "}
        <Link
          to="/dashboard"
          className="font-semibold text-[#48AF4A] hover:text-[#368237]"
        >
          Dashboard Tempat
        </Link>
      </p>
      <section className="block lg:flex justify-between">
        <Stack spacing="8" width="full">
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="name"
                  value={userInput.name}
                  disabled={!startEdit}
                  onChange={inputChangeHandler}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  disabled={true}
                />
              </FormControl>
              <FormControl className="flex items-center">
                <img
                  src={userImage()}
                  alt="user"
                  className="w-20 h-20 rounded-lg object-cover mr-5 outline outline-slate-200"
                />
                <div>
                  <FormLabel>Gambar Profil</FormLabel>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                  />
                  <Button
                    variant={startEdit ? "outline" : "solid"}
                    size="sm"
                    onClick={startEdit ? handleButtonClick : undefined}
                    isDisabled={!startEdit}
                  >
                    Ganti Gambar
                  </Button>
                </div>
              </FormControl>
            </Stack>
            <Divider />
            <HStack>
              <Button
                variant={startEdit ? "solid" : "outline"}
                size="sm"
                onClick={startEditHandler}
              >
                Edit Profil
              </Button>
              <UserAlert
                buttonFunction={{
                  isDisabled: !startEdit || !checkInput,
                  handleClick: handlePatchUserData,
                  buttonLoading: buttonLoading,
                }}
                buttonDescription={{
                  title: "Simpan Profil",
                  description: "Apakah kamu yakin ingin menyimpan profil?",
                  colorScheme: "green",
                }}
              />
            </HStack>
          </Stack>
        </Stack>
        <Show above="md">
          <Center height="350px" className="hidden lg:block px-5">
            <Divider orientation="vertical" />
          </Center>
        </Show>
        <Hide above="md">
          <Divider className="my-10" />
        </Hide>
        <Stack width="full">
          <UserPassword />
        </Stack>
      </section>
    </Container>
  );
};

export default User;
