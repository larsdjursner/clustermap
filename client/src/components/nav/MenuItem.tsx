import { Menu } from "@headlessui/react";
import { FC } from "react";
type Props = {
  handleClick?: () => void;
  activeIcon: React.ComponentProps<"svg">;
  inActiveIcon?: React.ComponentProps<"svg">;
};

const MenuItem: FC<Props> = ({ activeIcon, inActiveIcon, handleClick, children }) => {
  return (
    <Menu.Item onClick={handleClick}>
      {({ active }) => (
        <button
          className={`${
            active ? "bg-blue-200 text-gray-900" : "text-gray-600"
          } group flex rounded-md items-center w-full py-2 my-2 text-md justify-start gap-4`}
        >
          {active ? activeIcon : inActiveIcon && inActiveIcon}
          {children}
        </button>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
