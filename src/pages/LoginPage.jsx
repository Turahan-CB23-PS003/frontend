import { Box, Flex } from "@chakra-ui/react";

import Login from './src/components/Login/Details'; 

const LoginPage = () => {
  return (
    <Flex>
      <Box as="body" m="auto">
        <Login />
      </Box>
    </Flex>
  );
}

export default LoginPage;
