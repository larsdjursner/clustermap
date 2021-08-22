import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../sessions/AuthSlice";
import { ReactComponent as CogIcon } from "../../icons/Cog.svg";
import { ReactComponent as AccountIcon } from "../../icons/Account.svg";
import { ReactComponent as RightChevronIcon } from "../../icons/RightChevron.svg";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const DropdownItem = (props: any) => {
    return (
      <a
        href="#"
        className=" h-12 flex items-center p-2 border-b-1 border-solid hover:bg-gray-300 rounded-lg"
      >
        <span className="mr-2">{props.leftIcon}</span>
        {props.children}
        <span className="ml-auto mr-2">{props.rightIcon}</span>
      </a>
    );
  };

  return (
    <div
      className={
        " absolute top-12 w-72 transform -translate-x-1/2 bg-gray-100 p-4 overflow-hidden rounded-lg border-2 border-solid border-gray-300 z-50"
      }
    >
      {auth.isAuth ? (
        <>
          <DropdownItem leftIcon={<AccountIcon />}>My Account</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />} rightIcon={<RightChevronIcon />}>
            Settings
          </DropdownItem>
          <DropdownItem>Sign Out</DropdownItem>
        </>
      ) : (
        <DropdownItem>
          <Link to="/signin">Sign in</Link>
        </DropdownItem>
      )}
    </div>
  );
};

export default DropdownMenu;
