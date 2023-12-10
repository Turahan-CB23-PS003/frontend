import { Container } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Container maxW={"6xl"} pt={20} centerContent className="pt-20">
      <h1 className="text-9xl font-bold">404</h1>
      <p>Not Found</p>
    </Container>
  );
};

export default NotFound;
