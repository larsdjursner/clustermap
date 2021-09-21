import { FC, useState } from "react";

interface Props {
  icon: any;
}

const NavItem: FC<Props> = ({ icon, children }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="inline-flex justify-center w-24 px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        {icon}
      </div>
      {children}
    </div>
  );
};

export default NavItem;
