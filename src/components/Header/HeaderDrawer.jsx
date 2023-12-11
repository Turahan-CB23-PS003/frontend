import FooterLogo from "../Footer/FooterLogo";
import {
  Button,
  Drawer,
  DrawerBody,
  Divider,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import HeaderProfile from "./HeaderProfile";
import { Link } from "react-router-dom";

const HeaderDrawer = ({
  isOpen,
  onClose,
  btnRef,
  children,
  userData,
  userImage,
}) => {
  const NavigationLg = () => {
    if (userData.name) {
      return (
        <div className="my-6 ml-4">
          <HeaderProfile userImage={userImage} userName={userData.name} />
        </div>
      );
    }
    return (
      <div className="my-6 ml-4">
        <Link to="/login" onClick={onClose}>
          <Button className="ml-3" variant="outline">
            Login
          </Button>
        </Link>
        <Link to="/register" onClick={onClose}>
          <Button className="ml-3" variant="outline">
            Register
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton className="mt-3" />
        <DrawerHeader className="mt-3">
          <FooterLogo />
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <Divider />
        <NavigationLg />
      </DrawerContent>
    </Drawer>
  );
};

HeaderDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  btnRef: PropTypes.object,
  children: PropTypes.node,
  userData: PropTypes.object,
  userImage: PropTypes.string,
};

export default HeaderDrawer;
