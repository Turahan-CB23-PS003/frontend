import { Container } from "@chakra-ui/react";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <section className="px-2 md:px-0">
      <Container maxW="6xl">
        <Login />
      </Container>
    </section>
  );
};

export default LoginPage;
