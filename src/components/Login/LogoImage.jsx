import { Image } from "@chakra-ui/react";

const LogoImage = () => {
  return (
    <>
      <Image src="login.png" alt="logo_login_turahan" maxW="100%" h="auto" />
      <p className="text-md md:text-xl" >
        Atasi Kelaparan dan Selamatkan Bumi
      </p>
    </>
  );
};

export default LogoImage;
