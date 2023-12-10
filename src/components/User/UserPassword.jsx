import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import axios from "axios";
import { GlobalContext } from "../../App";
import Cookies from "js-cookie";
import UserAlert from "./UserAlert";
import { useNavigate } from "react-router-dom";

const UserPassword = () => {
  const navigate = useNavigate();
  const { userIdToken, setUserIdToken, setUserData } = useContext(GlobalContext);
  const { userId, userAccessToken } = userIdToken;
  const [startEdit, setStartEdit] = useState(false);
  const [checkInput, setCheckInput] = useState(false);
  const [userInput, setUserInput] = useState({
    oldPassword: "",
    newPassword: "",
  });

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
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserInput((prevState) => {
      if (value === "") {
        setCheckInput(false);
      }
      if (userInput.oldPassword !== "" && userInput.newPassword !== "") {
        setCheckInput(true);
      }
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const startEditHandler = () => {
    setStartEdit((prevState) => !prevState);
  };

  const [buttonLoading, setButtonLoading] = useState(false);

  const toast = useToast();

  const handlePatchPassword = async () => {
    setButtonLoading(true);
    try {
      const response = await axios.patch(
        `${GLOBAL_ROUTE}/api/v1/users/${userId}/password`,
        userInput,
        {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
          },
        },
      );
      if (response.data.status === "success") {
        toast({
          title: "Berhasil",
          description: "Password berhasil diubah",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setStartEdit(false);
        setUserInput({
          oldPassword: "",
          newPassword: "",
        });
        toast({
          title: "Silakan login kembali",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        removeCookieHandler();
        navigate("/");
      } else {
        toast({
          title: "Gagal",
          description: response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Password gagal diubah",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setButtonLoading(false);
  };

  return (
    <Stack spacing="8">
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="name">Old Password</FormLabel>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              value={userInput.oldPassword}
              disabled={!startEdit}
              onChange={inputChangeHandler}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">New Password</FormLabel>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={userInput.newPassword}
              disabled={!startEdit}
              onChange={inputChangeHandler}
            />
          </FormControl>
        </Stack>
        <Divider />
        <HStack>
          <Button
            variant={startEdit ? "solid" : "outline"}
            size="sm"
            onClick={startEditHandler}
          >
            Edit Password
          </Button>
          <UserAlert
            buttonFunction={{
              isDisabled: !startEdit || !checkInput,
              handleClick: handlePatchPassword,
              buttonLoading: buttonLoading,
            }}
            buttonDescription={{
              title: "Ganti Password",
              description:
                "Apakah kamu yakin ingin mengganti password? Anda harus login kembali setelah mengganti password.",
              colorScheme: "red",
            }}
          />
        </HStack>
      </Stack>
    </Stack>
  );
};

export default UserPassword;
