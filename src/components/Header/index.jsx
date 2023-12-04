import { NavLink, Link, useLocation } from "react-router-dom";
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
import HeaderDrawer from "./HeaderDrawer";
import HeaderLinks from "./HeaderLinks";
import FooterLogo from "../Footer/FooterLogo";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const location = useLocation();
  const currentLink = location.pathname;

  console.log(currentLink.substring(1));

  const LinkStyle =
    "text-lg mx-4 font-semibold transition-all ease-in duration-100";

  return (
    <header>
      <div className="shadow-sm py-3 md:py-5 px-2 md:px-0">
        <Container maxW={"6xl"}>
          <nav className="flex justify-between">
            <section className="flex justify-center items-center">
              <Link to="/">
                <FooterLogo className="mr-10" />
              </Link>
              <div className="hidden lg:flex justify-center items-center">
                {HeaderLinks.map((link) => {
                  return (
                    <NavLink
                      to={link.href}
                      key={link.label}
                      className={({ isActive }) =>
                        isActive
                          ? `${LinkStyle} text-[#48AF4A]`
                          : `${LinkStyle} text-[#4A5568] hover:text-[#48AF4A]`
                      }
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
              </div>
            </section>
            <section className="flex justify-center items-center">
              <div className="hidden lg:flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <Input placeholder="Basic usage" className="mr-2" />
                  <Button variant="outline">
                    <FiSearch className="text-2xl text-[#4B5669] cursor-pointer" />
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <Button className="ml-3" variant="outline">
                  Login
                </Button>
              </div>
              <div ref={btnRef} onClick={onOpen} className="block lg:hidden">
                <Button variant="ghost">
                  <Hamburger color="#4B5669" toggled={isOpen} toggle={onOpen} />
                </Button>
              </div>
              <HeaderDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef}>
                <div className="flex flex-col">
                  {HeaderLinks.map((link) => {
                    return (
                      <NavLink
                        onClick={onClose}
                        to={link.href}
                        key={link.label}
                        className={({ isActive }) =>
                          isActive
                            ? `${LinkStyle} text-lg mt-5 font-semibold text-[#48AF4A]`
                            : `${LinkStyle} text-lg mt-5 font-semibold text-[#4A5568] hover:text-[#48AF4A]`
                        }
                      >
                        {link.label}
                      </NavLink>
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
      </div>
      <Divider />
    </header>
  );
};

export default Header;
