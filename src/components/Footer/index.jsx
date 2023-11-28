"use client";

import FooterLogo from "./FooterLogo";
import FooterStack from "./FooterStack";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr", md: "3fr 2fr" }}
          spacing={24}
        >
          <Stack spacing={6}>
            <Box className="flex items-center justify-center md:block">
              <FooterLogo color={useColorModeValue("gray.700", "white")} />
            </Box>
            <Text fontSize={"sm"} className="text-center md:text-start">
              Aplikasi Turahan mengurangi pemborosan makanan dengan memanfaatkan
              platform web yang memungkinkan bisnis makanan membagikan sisa
              makanan kepada masyarakat yang membutuhkan.
            </Text>
            <Text fontSize={"sm"} className="text-center md:text-start">
              © {`${new Date().getFullYear()}`} Turahan. All rights reserved
            </Text>
          </Stack>
          <section className="collapse md:visible" >
            <FooterStack/>
          </section>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
