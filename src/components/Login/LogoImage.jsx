import { Image, Text } from "@chakra-ui/react";

const LogoImage = () => {
  return (
    <>
      <Image src="login.png" alt="logo_login_turahan" maxW="100%" h="auto" />
      <Text fontSize="1.4em" mt={1} >
        Atasi Kelaparan dan Selamatkan Bumi
      </Text>
    </>
  );
};

export default LogoImage;
