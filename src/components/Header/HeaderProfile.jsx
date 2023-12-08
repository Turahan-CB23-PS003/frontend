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

const HeaderProfile = ({ userImage, userName }) => {
  return (
    <div className="flex items-center">
      <Button className="mr-3" variant="outline">
        <LuLayoutDashboard />
        <p className="ml-1">Dashboard</p>
      </Button>
      <Popover>
        <PopoverTrigger>
          <Button variant="ghost" px={0} py={0}>
            <img
              src={userImage}
              alt="User"
              className="w-10 h-10 rounded-full outline outline-slate-200"
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
              <Link to="/profile">
                <Button className="mr-3" variant="outline" colorScheme="green">
                  Profile
                </Button>
              </Link>
              <Logout />
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
};

export default HeaderProfile;
