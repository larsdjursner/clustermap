import { FC, useState } from "react";

interface Props {
  icon : any;
}

const NavItem : FC<Props>= ({icon, children}) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="w-12 flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full 
        bg-gray-500 p-2 m-1 flex items-center justify-center hover:bg-gray-400 transition duration-500 ease-out cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {icon }
      </div>
      {open && children}
      
    </li>
  );
};

export default NavItem;
