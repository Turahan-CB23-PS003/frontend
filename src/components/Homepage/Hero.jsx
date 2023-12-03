"use client";

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";




const HeroHomepage = () => {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          TURAHAN{" "}
          <Text as={"span"} color={"orange.400"}>
            made easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Turahan menghubungkan makanan berlebih dari restoran dan hotel dengan
          mereka yang membutuhkan, melalui platform web inklusif. Inisiatif ini
          bertujuan mengurangi limbah makanan dan meningkatkan kesadaran
          lingkungan.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <ChakraLink as={ReactRouterLink} to="/retailers">
            <Button
              rounded={"full"}
              px={6}
              colorScheme={"orange"}
              bg={"orange.400"}
              _hover={{ bg: "orange.500" }}
            >
              Donasi Makanan
            </Button>
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/meals">
            <Button rounded={"full"} px={6}>
              Minta Makanan
            </Button>
          </ChakraLink>
        </Stack>
        <Flex w={"full"} alignContent={"center"} justifyContent={"center"}>
          <Center>
            <Image
              src="HeroImage.png"
              height={{ sm: "24rem", lg: "28rem" }}
              mt={{ base: 12, sm: 16 }}
            />
          </Center>
        </Flex>
      </Stack>
    </Container>
  );
};

export default HeroHomepage;
