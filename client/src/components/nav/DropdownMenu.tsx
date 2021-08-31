import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, signOut } from "../sessions/AuthSlice";
import { Link } from "react-router-dom";
import { FC } from "react";
import DropdownItem from "./DropdownItem";
import { CogIcon, GlobeIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { clear } from "../map/ReactMapSlice";

interface Props {
  open?: boolean;
}

const DropdownMenu: FC<Props> = ({ open, children }) => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  return (
    <div
      className={
        " absolute top-10 w-72 transform -translate-x-1/2 bg-gray-100 p-4 overflow-hidden rounded-lg border-2 border-solid border-gray-300 z-50"
      }
    >
      {auth.isAuth ? (
        <>
          <DropdownItem leftIcon={<GlobeIcon />}>
            {auth.user?.displayName}
          </DropdownItem>
          <DropdownItem leftIcon={<CogIcon />} rightIcon={<ChevronRightIcon />}>
            Settings
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => {
                dispatch(clear());
                dispatch(signOut());
                localStorage.removeItem("jwt");
              }}
            >
              Sign Out
            </div>
          </DropdownItem>
        </>
      ) : (
        <DropdownItem>
          <Link to="/signin">Sign In</Link>
        </DropdownItem>
      )}
    </div>
  );
};
export default DropdownMenu;
