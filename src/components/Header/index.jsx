import { NavLink, Link } from "react-router-dom";
import { Container, Divider, Button, useDisclosure } from "@chakra-ui/react";
import { useState, useRef, useContext, useEffect } from "react";
import Hamburger from "hamburger-react";
import HeaderDrawer from "./HeaderDrawer";
import HeaderLinks from "./HeaderLinks";
import FooterLogo from "../Footer/FooterLogo";
import HeaderProfile from "./HeaderProfile";
import GLOBAL_ROUTE from "../../helpers/GlobalRoute";
import { GlobalContext } from "../../App";

const Header = () => {
  const { userData } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const userImage = `${GLOBAL_ROUTE}img/${
    userData.image
      ? `users/${userData.image}`
      : "meals/pexels-engin-akyurt-1907642.jpg"
  }`;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const LinkStyle =
    "text-lg mx-4 font-semibold transition-all ease-in duration-100";

  useEffect(() => {
    setIsLoading(false);
  }, [userData.name]);

  const NavigationLg = () => {
    if (userData.name) {
      return (
        <div className="hidden lg:block">
          <HeaderProfile
            userImage={userImage}
            userName={userData.name}
            onClose={onClose}
          />
        </div>
      );
    }
    if (isLoading) {
      return (
        <div className="hidden lg:block">
          <Button
            isDisabled={true}
            variant="outline"
            size="sm"
            isLoading={true}
            loadingText="Memuat..."
          ></Button>
        </div>
      );
    }
    return (
      <div className="hidden lg:block">
        <Link to="/login">
          <Button className="ml-3" variant="outline">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button className="ml-3" variant="outline">
            Register
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="shadow-sm py-1 md:py-5 px-2 md:px-0">
        <Container maxW={"6xl"}>
          <nav className="flex justify-between">
            <section className="flex justify-center items-center">
              <Link to="/">
                <FooterLogo />
              </Link>
              <div className="hidden lg:flex justify-center items-center ml-8">
                {HeaderLinks.map((link) => {
                  return (
                    <NavLink
                      to={link.href}
                      key={link.label}
                      className={({ isActive }) =>
                        isActive
                          ? `${LinkStyle} text-[#38A169]`
                          : `${LinkStyle} hover:text-[#2F855A]`
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
                            ? `${LinkStyle} text-lg mt-5 font-semibold text-[#38A169]`
                            : `${LinkStyle} text-lg mt-5 font-semibold hover:text-[#2F855A]`
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
