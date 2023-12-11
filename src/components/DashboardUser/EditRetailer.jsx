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
  Select,
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

const EditRetailer = ({ retailers, refresher, setRefresher }) => {
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

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    const isTime = name === "openTime" || name === "closeTime";
    setSendData((prevState) => {
      return {
        ...prevState,
        [name]: isTime ? `${value}:00` : value,
      };
    });
    const validCheck = Object.values(sendData).every((value) => value !== "");
    console.log(sendData, validCheck);
    setIsDataValid(validCheck);
  };

  const handleRadioChange = (value) => {
    setSendData((prevState) => ({
      ...prevState,
      status: value,
    }));
    console.log(sendData);
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

  const handleDeleteUserData = async () => {
    setButtonLoading(true);
    try {
      const response = await axios.delete(
        `${GLOBAL_ROUTE}api/v1/retailers/${selectedRetailer}`,
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
          ? "Tempat berhasil dihapus."
          : message || "Tempat gagal dihapus.",
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
        setSelectedRetailer(0);
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

  const handlePatchUserData = async () => {
    setButtonLoading(true);
    try {
      const formData = new FormData();
      Object.entries(sendData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile !== "") {
        formData.append("image", imageFile);
      }

      const response = await axios.patch(
        `${GLOBAL_ROUTE}api/v1/retailers/${selectedRetailer}`,
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
          ? "Tempat berhasil diubah."
          : message || "Tempat gagal diubah.",
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
        setImageSrc("");
        setImageFile("");
        setSelectedRetailer(0);
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

  const [selectedRetailer, setSelectedRetailer] = useState(0);

  const handleRetailerChange = (event) => {
    setSelectedRetailer(event.target.value);
    const filteredRetailer = retailers.filter((retailer) => {
      return Number(retailer.id) === Number(event.target.value);
    })[0];
    setSendData({
      name: filteredRetailer.name,
      status: filteredRetailer.status,
      openTime: filteredRetailer.open_time,
      closeTime: filteredRetailer.close_time,
      location: filteredRetailer.location,
      gmaps: filteredRetailer.gmaps,
      contact: filteredRetailer.contact,
      description: filteredRetailer.description,
    });
    if (filteredRetailer.image) {
      setImageSrc(`${GLOBAL_ROUTE}img/retailers/${filteredRetailer.image}`);
    }
    setIsDataValid(true);
  };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            <h2 className="font-semibold text-xl">Edit atau Hapus Tempat</h2>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <FormControl className="mb-5" isRequired>
          <InputGroup>
            <Select value={selectedRetailer} onChange={handleRetailerChange}>
              <option value={0}>Pilih Tempat</option>
              {retailers.map((retailer) => {
                return (
                  <option key={retailer.id} value={retailer.id}>
                    {retailer.name}
                  </option>
                );
              })}
            </Select>
          </InputGroup>
        </FormControl>
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
        <section className="flex items-center">
          <UserAlert
            buttonFunction={{
              isDisabled: !isDataValid || selectedRetailer === 0,
              handleClick: handlePatchUserData,
              buttonLoading,
            }}
            buttonDescription={{
              title: "Edit Tempat",
              description: "Apakah kamu yakin ingin mengubah tempat ini?",
              colorScheme: "green",
            }}
            buttonColor="green"
          />
          <div className="mx-2"></div>
          <UserAlert
            buttonFunction={{
              isDisabled: !isDataValid || selectedRetailer === 0,
              handleClick: handleDeleteUserData,
              buttonLoading,
            }}
            buttonDescription={{
              title: "Hapus Tempat",
              description: "Apakah kamu yakin ingin menghapus tempat ini?",
              colorScheme: "red",
            }}
            buttonColor="red"
          />
        </section>
      </AccordionPanel>
    </AccordionItem>
  );
};

EditRetailer.propTypes = {
  retailers: PropTypes.array,
  refresher: PropTypes.bool,
  setRefresher: PropTypes.func,
};

export default EditRetailer;
