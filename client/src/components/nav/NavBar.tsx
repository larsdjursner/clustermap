import { GlobeIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import NavLogo from "./partials/NavLogo";
import MenuDropdown from "./MenuDropdown";
// import SearchBarPlaceholder from "./SearchBarPlaceholder";
// import DarkModeToggle from "./partials/DarkModeToggle";

const NavBar: FC = () => {

  return (
    <nav
      className={
        "w-screen h-nav bg-gray-700 py-0 px-10 border-solid border-gray-800 border-b-2 fixed z-50"
      }
    >
      <div className={"m-0 p-0 max-w-full h-full flex justify-between"}>
        <div
          className={
            "m-0 p-0 max-w-full h-full flex justify-between gap-40 items-center mx-10"
          }
        >
          <NavLogo />
          {/* <SearchBarPlaceholder /> */}
        </div>
        <div
          className={
            "m-0 p-0 max-w-full h-full flex justify-end place-content-center gap-10 mr-8"
          }
        >
          {/* <NavItem icon={<DarkModeToggle />} /> */}
          <NavItem
            icon={
              <Link to="/map">
                <GlobeIcon className="w-5 h-5  text-gray-200" />
              </Link>
            }
          />
          <MenuDropdown />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
