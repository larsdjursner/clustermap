import { useState } from "react";

const NavItem = (props: any) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="w-12 flex items-center justify-center">
      <a
        href="#"
        className="w-8 h-8 rounded-full bg-gray-500 p-2 m-1 flex items-center justify-center transition filter duration-300 hover:bg-gray-400"
        onClick={() => setOpen(!open)}
      >
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
};

export default NavItem;
