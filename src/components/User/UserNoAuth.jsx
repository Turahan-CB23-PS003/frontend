import { Link } from "react-router-dom";
import { Container } from "@chakra-ui/react";

const UserNoAuth = () => {
  return (
    <Container maxW={"6xl"}>
      <section className="flex flex-col justify-center items-center pt-32">
        <h1 className="text-4xl font-bold">You must login first</h1>
        <p>
          Go to{" "}
          <Link
            to="/"
            className="font-semibold text-[#48AF4A] hover:text-[#368237]"
          >
            Home
          </Link>{" "}
          or{" "}
          <Link
            to="/"
            className="font-semibold text-[#48AF4A] hover:text-[#368237]"
          >
            Login
          </Link>
        </p>
      </section>
    </Container>
  );
};

export default UserNoAuth;
