import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import LogoImage from '../Login/LoginLogo';
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement,
  Progress
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const PasswordStrengthMeter = ({ password }) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const checkPasswordStrength = () => {
      let no = 0;

      if (
        password.length >= 3 &&
        (/[a-z]/.test(password) ||
          /\d+/.test(password) ||
          /[A-Z]/.test(password) ||
          /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(password)) 
      ) {
        no = 1;
      }

      if (
        password.length >= 6 &&
        ((/[A-Z]/.test(password) && /\d+/.test(password)) ||
          (/[a-z]/.test(password) && /\d+/.test(password)) ||
          (/\d+/.test(password) && /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(password)) ||
          (/[a-z]/.test(password) && /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(password))||
          (/[A-Z]/.test(password) && /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(password)) ||
          (/[A-Z]/.test(password) && /[a-z]/.test(password)) ||
          (/[a-z]/.test(password) && /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(password) && /\d+/.test(password)) ||
          (/[A-Z]/.test(password) && /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(password) && /\d+/.test(password)) ||
          (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d+/.test(password)) ||
          (/[A-Z]/.test(password) && /[a-z]/.test(password) && /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(password)&& /\d+/.test(password))
        )
      ) {
        no = 2;
      }

      if (
        password.length >= 8 &&
        (/[A-Z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/.test(password) && /\d+/.test(password))
      ) {
        no = 3;
      }
      setStrength(no);
    };

    checkPasswordStrength();
  },[password]);

  const getPasswordStrengthMessage = () => {
    switch (strength) {
      case 1:
        return "Kata sandi lemah";
      case 2:
        return "Kata sandi sedang";
      case 3:
        return "Kata sandi kuat";
      default:
        return "Masukkan kata sandi";
    }
  };


  return (
    <FormControl>
      <FormHelperText textAlign="left">
        {getPasswordStrengthMessage()}
      </FormHelperText>
      <Progress
        value={strength * 33.33}
        size="sm"
        mt={2}
      />
    </FormControl>
  );
};

PasswordStrengthMeter.propTypes = {
  password: PropTypes.string.isRequired,
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleShowClick = () => setShowPassword(!showPassword);
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
              backgroundColor="white"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input type="string" placeholder="nama" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input type="email" placeholder="alamat email" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="5.7rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <PasswordStrengthMeter password={password} />
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="yellow"
                width="full"
              >
                Daftar
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Sedah punya akun?Yuk{" "}
        <Link color="blue" to="/login" as={RouterLink}>
          Login!
        </Link>
      </Box>
    </Flex>
  );
};

export default Register;