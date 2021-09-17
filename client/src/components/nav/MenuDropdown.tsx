import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  ChevronDownIcon,
  CogIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  UserIcon,
} from "@heroicons/react/solid";
import MenuItem from "./MenuItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, signOut } from "../sessions/AuthSlice";
import { clear } from "../map/ReactMapSlice";
import { Link } from "react-router-dom";

const MenuDropdown = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const generateInitials = () => {
    if (auth.user?.displayName) {
      const nameArray = auth.user?.displayName.split(" ");
      return nameArray[0][0] + nameArray[nameArray.length - 1][0];
    }
    return "";
  };

  const SignOutCallback = () => {
    console.log("passing down sign out");
    dispatch(clear());
    dispatch(signOut());
    localStorage.removeItem("jwt");
  };
  return (
    <div className={"flex items-center"}>
      <Menu as="div" className=" relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-26 gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {auth.isAuth ? (
              <>
                <p>{generateInitials()}</p>
                <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 t" />
              </>
            ) : (
              <>
                <p>Sign In</p>
                <MenuIcon className="w-5 h-5  text-gray-200" />
              </>
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scaleF-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-50 absolute right-0 w-80 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 w-full">
              {auth.isAuth ? (
                <div>
                  <MenuItem
                    inActiveIcon={
                      <UserIcon className={"h-5 w-5 mx-2 text-gray-600"} />
                    }
                    activeIcon={
                      <UserIcon className={"h-5 w-5 mx-2 text-blue-900"} />
                    }
                  >
                    {auth.user?.displayName}
                  </MenuItem>
                  <MenuItem
                    inActiveIcon={
                      <CogIcon className={"h-5 w-5 mx-2 text-gray-600"} />
                    }
                    activeIcon={
                      <CogIcon className={"h-5 w-5 mx-2 text-blue-900"} />
                    }
                  >
                    {"Settings"}
                  </MenuItem>
                  <MenuItem
                    inActiveIcon={
                      <LogoutIcon className={"h-5 w-5 mx-2 text-gray-600"} />
                    }
                    activeIcon={
                      <LogoutIcon className={"h-5 w-5 mx-2 text-blue-900"} />
                    }
                    handleClick={SignOutCallback}
                  >
                    <Link to="/">Sign Out</Link>
                  </MenuItem>
                </div>
              ) : (
                <MenuItem
                  inActiveIcon={
                    <LoginIcon className={"h-5 w-5 mx-2 text-gray-600"} />
                  }
                  activeIcon={
                    <LoginIcon className={"h-5 w-5 mx-2 text-blue-900"} />
                  }
                >
                  <Link to="/signin">Sign In</Link>
                </MenuItem>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MenuDropdown;
