import { NavLink, Link, useLocation } from "react-router-dom";
import { Container, Divider, Button, useDisclosure } from "@chakra-ui/react";
import { useRef, useContext } from "react";
import Hamburger from "hamburger-react";
import HeaderDrawer from "./HeaderDrawer";
import HeaderLinks from "./HeaderLinks";
import FooterLogo from "../Footer/FooterLogo";
import HeaderProfile from "./HeaderProfile";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import { GlobalContext } from "../../App";

const Header = () => {
  const { userData } = useContext(GlobalContext);
  const userImage = `${GLOBAL_ROUTE}/img/${
    userData.image
      ? `users/${userData.image}`
      : "meals/pexels-engin-akyurt-1907642.jpg"
  }`;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const location = useLocation();
  const currentLink = location.pathname;

  console.log(currentLink.substring(1));

  const LinkStyle =
    "text-lg mx-4 font-semibold transition-all ease-in duration-100";

  const NavigationLg = () => {
    if (userData.name) {
      return (
        <div className="hidden lg:block">
          <HeaderProfile userImage={userImage} userName={userData.name} />
        </div>
      );
    }
    return (
      <div className="hidden lg:block">
        <Button className="ml-3" variant="outline">
          Login
        </Button>
        <Button className="ml-3" variant="outline">
          Register
        </Button>
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
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
                          : `${LinkStyle} hover:text-[#48AF4A]`
                      }
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
              </div>
            </section>
            <section className="flex justify-center items-center">
              <NavigationLg />
              <div ref={btnRef} onClick={onOpen} className="block lg:hidden">
                <Hamburger color="#4B5669" toggled={isOpen} toggle={onOpen} />
              </div>
              <HeaderDrawer
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
                userData={userData}
                userImage={userImage}
              >
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
                            : `${LinkStyle} text-lg mt-5 font-semibold hover:text-[#48AF4A]`
                        }
                      >
                        {link.label}
                      </NavLink>
                    );
                  })}
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
