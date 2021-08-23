import { FC } from "react";

const NavBar: FC = ({ children }) => {
  return (
    <nav
      className={
        "h-2/5 bg-gray-800 py-0 px-4 border-b-1 border-solid border-gray-900"
      }
    >
      <ul className={" list-none m-0 p-0 max-w-full h-full flex justify-end"}>
        {children}
      </ul>
    </nav>
  );
};

export default NavBar;
