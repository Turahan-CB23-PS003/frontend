import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import PropTypes from "prop-types";

const UserAlert = ({ buttonFunction, buttonDescription, buttonColor = "gray" }) => {
  const { isDisabled, handleClick, buttonLoading } = buttonFunction;
  const { title, description, colorScheme } = buttonDescription;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  return (
    <>
      <Button
        isDisabled={isDisabled}
        onClick={onOpen}
        variant={isDisabled ? "outline" : "solid"}
        size="sm"
        isLoading={buttonLoading}
        loadingText="Mengirim Data"
        colorScheme={buttonColor}
      >
        {title}
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme={colorScheme}
              ml={3}
              onClick={() => {
                handleClick();
                onClose();
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

UserAlert.propTypes = {
  buttonFunction: PropTypes.shape({
    isDisabled: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    buttonLoading: PropTypes.bool.isRequired,
  }).isRequired,
  buttonDescription: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    colorScheme: PropTypes.string.isRequired,
  }).isRequired,
  buttonColor: PropTypes.string,
};

export default UserAlert;
