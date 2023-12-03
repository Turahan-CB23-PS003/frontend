import { Box, Text, Stack, SimpleGrid } from "@chakra-ui/react";
import { SupportLink, FollowUsLink } from "./FooterLinks";

const FooterStack = () => {
  return (
    <SimpleGrid templateColumns={{ sm: "1fr 1fr", md: "3fr 2fr" }} spacing={0}>
      <Stack align={"flex-start"}>
        <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
          Support
        </Text>
        {SupportLink.map((link) => (
          <Box key={link.label} as="a" href={link.href}>
            {link.label}
          </Box>
        ))}
      </Stack>
      <Stack align={"flex-start"}>
        <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
          Follow Us
        </Text>
        {FollowUsLink.map((link) => (
          <Box key={link.label} as="a" href={link.href}>
            {link.label}
          </Box>
        ))}
      </Stack>
    </SimpleGrid>
  );
};

export default FooterStack;
