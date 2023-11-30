import FooterLogo from "../Footer/FooterLogo";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const HeaderDrawer = ({ isOpen, onClose, btnRef, children }) => {
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

        <DrawerFooter>
          <Button className="mt-5">Login</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

HeaderDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  btnRef: PropTypes.object,
  children: PropTypes.node,
};

export default HeaderDrawer;
