import { FiSearch } from "react-icons/fi";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const HeaderPopover = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant='ghost'>
          <FiSearch className="text-2xl text-[#4B5669] cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Search</PopoverHeader>
        <PopoverBody>
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

HeaderPopover.propTypes = {
  children: PropTypes.node,
};

export default HeaderPopover;
