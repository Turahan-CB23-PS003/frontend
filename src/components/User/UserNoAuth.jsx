import { Link } from "react-router-dom";
import { Container } from "@chakra-ui/react";

const UserNoAuth = () => {
  return (
    <Container maxW={"6xl"}>
      <section className="flex flex-col justify-center items-center pt-16">
        <h1 className="text-4xl font-bold mb-5">Kamu harus login terlebih dahulu</h1>
        <p>
          Pergi ke{" "}
          <Link
            to="/"
            className="font-semibold text-[#38A169] hover:text-[#368237]"
          >
            Home
          </Link>{" "}
          atau{" "}
          <Link
            to="/"
            className="font-semibold text-[#38A169] hover:text-[#368237]"
          >
            Login
          </Link>
        </p>
      </section>
    </Container>
  );
};

export default UserNoAuth;
