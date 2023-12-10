import { Container } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <section className="pt-20">
      <Container maxW={"6xl"} pt={20} centerContent>
        <h1 className="text-9xl font-bold">404</h1>
        <p>Not Found</p>
      </Container>
    </section>
  );
};

export default NotFound;
