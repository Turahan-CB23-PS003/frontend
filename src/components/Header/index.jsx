import { Container, Divider } from "@chakra-ui/react";
import FooterLogo from "../Footer/FooterLogo";

const Header = () => {
  return (
    <header>
      <header className="shadow-sm py-5">
        <Container maxW={"7xl"}>
          <nav>
            <FooterLogo />
          </nav>
        </Container>
      </header>
      <Divider />
    </header>
  );
};

export default Header;
