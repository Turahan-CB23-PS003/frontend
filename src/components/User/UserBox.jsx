import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

const UserBox = ({ children }) => {
  return (
    <Box
      py={{
        base: "0",
        sm: "8",
      }}
      px={{
        base: "4",
        sm: "10",
      }}
      bg={{
        base: "transparent",
        sm: "bg.surface",
      }}
      boxShadow={{
        base: "none",
        sm: "md",
      }}
      borderRadius={{
        base: "none",
        sm: "xl",
      }}
    >
      {children}
    </Box>
  );
};

UserBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserBox;
