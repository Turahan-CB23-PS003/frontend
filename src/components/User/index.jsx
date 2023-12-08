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
} from "@chakra-ui/react";
import UserBox from "./UserBox";
import { useState, useContext, useRef } from "react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import axios from "axios";
import UserNoAuth from "./UserNoAuth";
import { GlobalContext } from "../../App";

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
  };

  const startEditHandler = () => {
    setStartEdit((prevState) => !prevState);
  };

  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

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
      formData.append("image", imageFile);

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
    <Container maxW="xl">
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <h1 className="font-bold text-3xl md:text-5xl mb-5">Profilmu</h1>
            <p className="text-lg mb-5">
              Selamat datang kembali, {userData.name}!
            </p>
          </Stack>
        </Stack>
        <UserBox>
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
                    style={{ cursor: `${startEdit ? "pointer" : "auto"}` }}
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
              <Button
                variant={startEdit ? "outline" : "solid"}
                size="sm"
                style={{ cursor: `${startEdit ? "pointer" : "auto"}` }}
                onClick={startEdit ? handlePatchUserData : undefined}
                isLoading={buttonLoading}
                loadingText="Mengirim Data"
              >
                Simpan Profil
              </Button>
            </HStack>
          </Stack>
        </UserBox>
      </Stack>
    </Container>
  );
};

export default User;
