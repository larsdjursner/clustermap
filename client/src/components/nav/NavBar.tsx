import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, signOut } from "../sessions/AuthSlice";

const NavBar: FC = (props: any) => {
  return (
    <nav
      className={
        "h-2/5 bg-gray-800 py-0 px-4 border-b-1 border-solid border-gray-900"
      }
    >
      <ul className={" list-none m-0 p-0 max-w-full h-full flex justify-end"}>
        {props.children}
      </ul>
    </nav>
  );
};

export default NavBar;
