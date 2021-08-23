import { FC } from "react";

interface Props {
  leftIcon?: any;
  rightIcon?: any;
}

const DropdownItem: FC<Props> = ({ children, leftIcon, rightIcon }) => {
  return (
    <div
      className=" h-12 flex items-center p-2 border-b-1 border-solid hover:bg-gray-300 rounded-lg"
    >
      <span className="mr-2">{leftIcon}</span>
      {children}
      <span className="ml-auto mr-2">{rightIcon}</span>
    </div>
  );
};

export default DropdownItem;
