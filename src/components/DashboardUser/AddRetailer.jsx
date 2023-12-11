import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  Input,
  RadioGroup,
  Stack,
  Radio,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Button,
  useToast,
  Textarea,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useState, useRef, useContext } from "react";
import { GlobalContext } from "../../App";
import UserAlert from "../User/UserAlert";
import axios from "axios";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import { PhoneIcon, TimeIcon } from "@chakra-ui/icons";
import { MdOutlineRestaurant } from "react-icons/md";
import { FaMapSigns, FaBook } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import PropTypes from "prop-types";

const AddRetailer = ({ refresher, setRefresher }) => {
  const { userIdToken } = useContext(GlobalContext);
  const { userAccessToken } = userIdToken;
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [isDataValid, setIsDataValid] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [sendData, setSendData] = useState({
    name: "",
    status: "active",
    openTime: "",
    closeTime: "",
    location: "",
    gmaps: "",
    contact: "",
    description: "",
  });

  const validateInput = ({
    name = sendData.name,
    status = sendData.status,
    openTime = sendData.openTime,
    closeTime = sendData.closeTime,
    location = sendData.location,
    gmaps = sendData.gmaps,
    contact = sendData.contact,
    description = sendData.description,
  }) => {
    if (
      name &&
      status &&
      openTime &&
      closeTime &&
      location &&
      gmaps &&
      contact &&
      description
    ) {
      return true;
    }
    return false;
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    const isDataValid = validateInput({ [name]: value });
    setIsDataValid(isDataValid);
    const isTime = name === "openTime" || name === "closeTime";
    setSendData((prevState) => {
      return {
        ...prevState,
        [name]: isTime ? `${value}:00` : value,
      };
    });
  };

  const handleRadioChange = (value) => {
    setSendData((prevState) => ({
      ...prevState,
      status: value,
    }));
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

  const handlePostUserData = async () => {
    setButtonLoading(true);
    try {
      const formData = new FormData();
      Object.entries(sendData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile !== "") {
        formData.append("image", imageFile);
      }

      const response = await axios.post(
        `${GLOBAL_ROUTE}api/v1/retailers`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      const status = response.data.status === "success";
      const message = response.data.message;
      toast({
        title: status ? "Berhasil!" : "Gagal!",
        description: status
          ? "Tempat berhasil ditambahkan."
          : message || "Tempat gagal ditambahkan.",
        status: status ? "success" : "error",
        duration: 3000,
        isClosable: true,
      });
      if (message) {
        setSendData({
          name: "",
          status: "active",
          openTime: "",
          closeTime: "",
          location: "",
          gmaps: "",
          contact: "",
          description: "",
        });
        setImageSrc("");
        setImageFile("");
        setRefresher(!refresher);
      }
    } catch (error) {
      console.error("Error patching user data:", error);
      toast({
        title: "Gagal!",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setButtonLoading(false);
  };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            <h2 className="font-semibold text-xl">Tambahkan Tempat</h2>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <FormControl className="mb-5" isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdOutlineRestaurant className="text-slate-300" />
            </InputLeftElement>
            <Input
              type="name"
              placeholder="Nama tempat"
              name="name"
              value={sendData.name}
              onChange={inputChangeHandler}
            />
          </InputGroup>
        </FormControl>
        <FormControl className="mb-5" isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <PhoneIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Nomor kontak"
              name="contact"
              value={sendData.contact}
              onChange={inputChangeHandler}
            />
          </InputGroup>
        </FormControl>
        <FormControl className="mb-5" isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <TimeIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="time"
              placeholder="Jam buka"
              min={0}
              max={23}
              name="openTime"
              value={sendData.openTime ? sendData.openTime.substring(0, 5) : ""}
              onChange={inputChangeHandler}
            />
          </InputGroup>
        </FormControl>
        <FormControl className="mb-5" isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <TimeIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="time"
              placeholder="Jam tutup"
              min={0}
              max={23}
              name="closeTime"
              value={
                sendData.closeTime ? sendData.closeTime.substring(0, 5) : ""
              }
              onChange={inputChangeHandler}
            />
          </InputGroup>
        </FormControl>
        <FormControl className="mb-5" isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaMapSigns className="text-slate-300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Alamat"
              name="location"
              value={sendData.location}
              onChange={inputChangeHandler}
            />
          </InputGroup>
        </FormControl>
        <FormControl className="mb-5" isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SiGooglemaps className="text-slate-300" />
            </InputLeftElement>
            <Input
              type="url"
              placeholder="Link Google Maps"
              name="gmaps"
              value={sendData.gmaps}
              onChange={inputChangeHandler}
            />
          </InputGroup>
        </FormControl>
        <FormControl className="mb-5" isRequired>
          <InputGroup>
            <div className="flex items-center">
              <InputLeftAddon
                pointerEvents="none"
                style={{ background: "none", height: "100%" }}
              >
                <FaBook className="text-slate-300" />
              </InputLeftAddon>
            </div>
            <Textarea
              placeholder="Description"
              name="description"
              value={sendData.description}
              onChange={inputChangeHandler}
            />
          </InputGroup>
        </FormControl>
        <FormControl className="flex items-center mb-5">
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
            <FormLabel>Gambar Tempat</FormLabel>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
            <Button variant="outline" size="sm" onClick={handleButtonClick}>
              Ganti Gambar
            </Button>
          </div>
        </FormControl>
        <FormControl className="mb-5">
          <RadioGroup
            value={sendData.status}
            name="status"
            onChange={handleRadioChange}
          >
            <Stack spacing={5} direction="row">
              <Radio colorScheme="green" value="active">
                Buka
              </Radio>
              <Radio colorScheme="red" value="inactive">
                Tutup
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <UserAlert
          buttonFunction={{
            isDisabled: !isDataValid,
            handleClick: handlePostUserData,
            buttonLoading,
          }}
          buttonDescription={{
            title: "Tambahkan Tempat",
            description: "Apakah kamu yakin ingin menambahkan tempat ini?",
            colorScheme: "green",
          }}
        />
      </AccordionPanel>
    </AccordionItem>
  );
};

AddRetailer.propTypes = {
  refresher: PropTypes.bool,
  setRefresher: PropTypes.func,
};

export default AddRetailer;
