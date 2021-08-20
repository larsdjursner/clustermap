import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, signOut } from "../sessions/AuthSlice";

const NavBar: FC = (props : any) => {


  return (

    <nav className={" h-1/3 bg-gray-800 py-0 px-4 border-b-1 border-solid border-gray-800"}>
      <ul className={" list-none m-0 p-0 max-w-full h-full flex justify-end"}>
        {props.children}
      </ul>
    </nav>
    // <div className={`h-1/4 bg-gray-800`}>
    //   <div className={`text-white flex flex-row justify-around `}>
    //     {auth.isAuth ? (
    //       <>
    //         <div>{auth.user?.email}</div>
    //         <div>
    //           <button onClick={() => dispatch(signOut())}>Sign Out</button>
    //         </div>
    //       </>
    //     ) : (
    //       <Link to="/signin">
    //         <button>Sign in</button>
    //       </Link>
    //     )}
    //   </div>
    // </div>
  );
};

export default NavBar;
