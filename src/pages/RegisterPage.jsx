import { Box, Flex } from "@chakra-ui/react";

import Register from '../components/Register/register';

const RegisterPage = () => {
  return (
    <Flex>
      <Box as="body" m="auto">
        <Register />
      </Box>
    </Flex>
  );
}

export default RegisterPage;
