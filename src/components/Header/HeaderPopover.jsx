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

{
  /* <HeaderPopover>
        <div className="flex justify-center items-center">
          <Input placeholder="Basic usage" className="mr-2" />
          <Button variant="ghost">
            <FiSearch className="text-2xl text-[#4B5669] cursor-pointer" />
          </Button>
        </div>
      </HeaderPopover> */
}

const HeaderPopover = ({ children }) => {
  return (
    <Popover defaultIsOpen>
      <PopoverTrigger>
        <Button variant="ghost">
          <FiSearch className="text-2xl text-[#4B5669] cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Search</PopoverHeader>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

HeaderPopover.propTypes = {
  children: PropTypes.node,
};

export default HeaderPopover;
