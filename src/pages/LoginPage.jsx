import { Box, Flex } from "@chakra-ui/react";

import Details from '../components/Login/details'; // Sesuaikan dengan path yang benar

const LoginPage = () => {
  return (
    <Flex>
      <Box as="body" m="auto">
        <Details />
      </Box>
    </Flex>
  );
}

export default LoginPage;
