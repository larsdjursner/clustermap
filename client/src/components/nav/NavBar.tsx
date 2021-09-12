import {
  ChevronRightIcon,
  CogIcon,
  GlobeIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, signOut } from "../sessions/AuthSlice";
import DropdownItem from "./DropdownItem";
import DropdownMenu from "./DropdownMenu";
import NavItem from "./NavItem";
import { clear } from "../map/ReactMapSlice";

const NavBar: FC = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  return (
    <nav
      className={
        "h-2/5 bg-gray-800 py-0 px-4 border-b-1 border-solid border-gray-900"
      }
    >
      <ul className={" list-none m-0 p-0 max-w-full h-full flex justify-end"}>
        <NavItem
          icon={
            <Link to="/map">
              <GlobeIcon className="w-5 h-5  text-gray-200" />
            </Link>
          }
        />
        <NavItem icon={<MenuIcon className="w-5 h-5  text-gray-200" />}>
          <DropdownMenu>
            {auth.isAuth ? (
              <>
                <DropdownItem leftIcon={<GlobeIcon />}>
                  {auth.user?.displayName}
                </DropdownItem>
                <DropdownItem
                  leftIcon={<CogIcon />}
                  rightIcon={<ChevronRightIcon />}
                >
                  Settings
                </DropdownItem>
                <DropdownItem leftIcon={<LogoutIcon />}>
                  <div
                    onClick={() => {
                      dispatch(clear());
                      dispatch(signOut());
                      localStorage.removeItem("jwt");
                    }}
                  >
                    <Link to="/">Sign Out</Link>
                  </div>
                </DropdownItem>
              </>
            ) : (
              <DropdownItem leftIcon={<LoginIcon />}>
                <Link to="/signin">Sign In</Link>
              </DropdownItem>
            )}
          </DropdownMenu>
        </NavItem>
      </ul>
    </nav>
  );
};

export default NavBar;
