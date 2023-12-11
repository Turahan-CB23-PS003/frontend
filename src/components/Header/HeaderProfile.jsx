import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logout from "../Logout";
import { LuLayoutDashboard } from "react-icons/lu";
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

const HeaderProfile = ({ userImage, userName, onClose }) => {
  return (
    <div className="flex items-center">
      <Link to="/dashboard">
        <Button className="mr-3" variant="outline" onClick={onClose}>
          <LuLayoutDashboard />
          <p className="ml-1">Dashboard</p>
        </Button>
      </Link>
      <Popover>
        <PopoverTrigger>
          <Button variant="ghost" px={0} py={0}>
            <img
              src={userImage}
              alt="User"
              className="w-10 h-10 rounded-full outline outline-slate-200 object-cover"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <div className="flex justify-center items-center">
              <p>{userName}</p>
            </div>
          </PopoverHeader>
          <PopoverBody>
            <div className="flex justify-center items-center">
              <Link to="/profile" onClick={onClose}>
                <Button className="mr-3" variant="outline" colorScheme="green">
                  Profile
                </Button>
              </Link>
              <div onClick={onClose}>
                <Logout />
              </div>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

HeaderProfile.propTypes = {
  userName: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default HeaderProfile;
