import { Image, Text } from '@chakra-ui/react';

const LogoImage = () => {
  return (
    <>
      <Image src="../public/login.png" alt="logo_login_turahan" maxW="100%" h="auto" />
      <Text fontSize="1.4em" mt={1} fontFamily="Azedo Bold" color="black">
        Atasi Kelaparan dan Selamatkan Bumi
      </Text>
    </>
  );
};

export default LogoImage;
