import { Link } from "react-router-dom";
import {
  Container,
  Divider,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import Hamburger from "hamburger-react";
import HeaderPopover from "./HeaderPopover";
import HeaderDrawer from "./HeaderDrawer";
import HeaderLinks from "./HeaderLinks";
import FooterLogo from "../Footer/FooterLogo";
import { Link as ChakraLink } from "@chakra-ui/react";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <header>
      <header className="shadow-sm py-3 md:py-5">
        <Container maxW={"7xl"}>
          <nav className="flex justify-between">
            <section className="flex justify-center items-center">
              <Link to="/">
                <FooterLogo className="mr-10" />
              </Link>
              <div className="hidden md:flex justify-center items-center">
                {HeaderLinks.map((link) => {
                  return (
                    <Link
                      to={link.href}
                      key={link.label}
                      className="text-lg mx-4 font-semibold text-[#4A5568] hover:text-[#1A202C]"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </section>
            <section className="flex justify-center items-center">
              <div className="hidden md:flex justify-center items-center">
                <HeaderPopover>
                  <div className="flex justify-center items-center">
                    <Input placeholder="Basic usage" className="mr-2" />
                    <Button variant="ghost">
                      <FiSearch className="text-2xl text-[#4B5669] cursor-pointer" />
                    </Button>
                  </div>
                </HeaderPopover>
              </div>
              <div className="hidden md:block">
                <ChakraLink as={Link} to="login">
                  <Button className="ml-3" variant="outline">
                    Login
                  </Button>
                </ChakraLink>
              </div>
              <div ref={btnRef} onClick={onOpen} className="block md:hidden">
                <Button variant="ghost">
                  <Hamburger color="#4B5669" toggled={isOpen} toggle={onOpen} />
                </Button>
              </div>
              <HeaderDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef}>
                <div className="flex flex-col">
                  {HeaderLinks.map((link) => {
                    return (
                      <Link
                        to={link.href}
                        key={link.label}
                        className="text-lg mt-5 font-semibold text-[#4A5568] hover:text-[#1A202C]"
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
                <div className="flex justify-center items-center mt-5">
                  <Input placeholder="Basic usage" className="mr-2" />
                  <Button variant="ghost">
                    <FiSearch className="text-2xl text-[#4B5669] cursor-pointer" />
                  </Button>
                </div>
              </HeaderDrawer>
            </section>
          </nav>
        </Container>
      </header>
      <Divider />
    </header>
  );
};

export default Header;
