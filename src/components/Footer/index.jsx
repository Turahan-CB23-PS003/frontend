"use client";

import FooterLogo from "./FooterLogo";
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const shortenedText =
    "Aplikasi Turahan mengurangi pemborosan makanan dengan memanfaatkan platform web yang memungkinkan bisnis makanan membagikan sisa makanan kepada masyarakat yang membutuhkan.";

  const fullText =
    "Pemborosan makanan berdampak negatif pada lingkungan, ekonomi, dan masyarakat. Turahan berupaya mengatasi masalah ini dengan menghubungkan sumber makanan berlebih dari restoran, hotel, dan donatur dengan mereka yang membutuhkan. Komunitas Turahan melibatkan pemberi makanan yang menyumbangkan makanan tidak terpakai dan penerima manfaat yang mencakup orang miskin, tunawisma, dan korban bencana. Dengan demikian, Turahan menciptakan komunitas peduli yang mengurangi pemborosan makanan dan mendukung mereka yang kurang mampu.";

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={10}
        px={3}
        className="px-2 md:px-0"
      >
        <Stack
          spacing={6}
          className="flex flex-col items-center md:items-start"
        >
          <Box className="flex items-center justify-center">
            <FooterLogo color={useColorModeValue("gray.700", "white")} />
          </Box>
          <Text fontSize={"sm"} className="text-center md:text-start lg:hidden">
            {shortenedText}
          </Text>
          <Text fontSize={"sm"} className="hidden lg:block">
            {fullText}
          </Text>
          <Link
            to="https://github.com/Turahan-CB23-PS003"
            className="flex items-center hover:text-[#2F855A]"
          >
            <FaGithub className="text-xl mr-2" />
            <p>Github Turahan</p>
          </Link>
          <Text fontSize={"sm"} className="text-center md:text-start">
            © {`${new Date().getFullYear()}`} Turahan. All rights reserved
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
