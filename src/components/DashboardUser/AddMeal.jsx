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
  InputRightElement,
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
import { TimeIcon } from "@chakra-ui/icons";
import { MdOutlineRestaurant } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import PropTypes from "prop-types";

const AddMeal = ({ retailers, refresher, setRefresher }) => {
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
    description: "",
    price: 0,
    status: "active",
    dateProduced: "",
    expiryDate: "",
  });

  const converDateTime = (timeFormat = "") => {
    if (timeFormat === "") {
      return "";
    }
    const dateTime = new Date(timeFormat);
    const convertedTimeFormat = dateTime.toISOString();
    return convertedTimeFormat;
  };

  const revertDateTime = (timeFormat = "") => {
    if (timeFormat === "") {
      return "";
    }
    const dateTime = new Date(timeFormat);
    const convertedTimeFormat = dateTime.toISOString().slice(0, 16);
    return convertedTimeFormat;
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    const isDateTime = name === "dateProduced" || name === "expiryDate";
    let usedValue = value;
    if (name === "price") {
      if (
        isNaN(value) ||
        parseInt(value) < 0 ||
        String(value).startsWith("0")
      ) {
        usedValue = 0;
      }
    } else if (isDateTime) {
      usedValue = converDateTime(value);
    }
    setSendData((prevState) => {
      return {
        ...prevState,
        [name]: usedValue,
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
        `${GLOBAL_ROUTE}/api/v1/meals/${selectedRetailer}`,
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
          ? "Makanan berhasil ditambahkan."
          : message || "Makanan gagal ditambahkan.",
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
    console.log(event.target.value);
    setSelectedRetailer(event.target.value);
  };

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            <h2 className="font-semibold text-xl">Tambahkan Makanan</h2>
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
              placeholder="Nama makanan"
              name="name"
              value={sendData.name}
              onChange={inputChangeHandler}
            />
          </InputGroup>
        </FormControl>
        <FormControl className="mb-5" isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <p className="text-slate-300">Rp</p>
            </InputLeftElement>
            <Input
              type="number"
              placeholder="Harga"
              name="price"
              value={sendData.price}
              onChange={inputChangeHandler}
              min={0}
            />
          </InputGroup>
          <p className="text-sm text-gray-600 mt-2">* Jika makanan gratis isi dengan 0</p>
        </FormControl>
        <FormControl className="mb-5" isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <TimeIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="datetime-local"
              placeholder="Waktu produksi"
              name="dateProduced"
              value={revertDateTime(sendData.dateProduced)}
              onChange={inputChangeHandler}
            />
            <InputRightElement pointerEvents="none">
              <p className="text-slate-300">WIB</p>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl className="mb-5" isRequired>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <TimeIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="datetime-local"
              placeholder="Waktu kadaluarsa"
              name="expiryDate"
              value={revertDateTime(sendData.expiryDate)}
              onChange={inputChangeHandler}
            />
            <InputRightElement pointerEvents="none">
              <p className="text-slate-300">WIB</p>
            </InputRightElement>
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
            <FormLabel>Gambar Makanan</FormLabel>
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
                Tersedia
              </Radio>
              <Radio colorScheme="red" value="inactive">
                Tidak Tersedia
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <UserAlert
          buttonFunction={{
            isDisabled: !isDataValid || selectedRetailer === 0,
            handleClick: handlePostUserData,
            buttonLoading,
          }}
          buttonDescription={{
            title: "Tambahkan Makanan",
            description: "Apakah kamu yakin ingin menambahkan makanan ini?",
            colorScheme: "green",
          }}
        />
      </AccordionPanel>
    </AccordionItem>
  );
};

AddMeal.propTypes = {
  retailers: PropTypes.array,
  refresher: PropTypes.bool,
  setRefresher: PropTypes.func,
};

export default AddMeal;
