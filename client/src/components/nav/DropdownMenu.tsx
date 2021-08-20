import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../sessions/AuthSlice";

const DropdownMenu = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const DropdownItem = (props: any) => {
    return (
      <a href="#" className="">
        <span className="">{props.leftIcon}</span>
        {props.children}
        <span className="">{props.rightIcon}</span>
      </a>
    );
  };

  return (
    <div className={" w-72 transform translate-x-10  bg-gray-400 p-4 overflow-hidden "}>
      <DropdownItem>{auth.user?.email}</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </div>
  );
};

export default DropdownMenu;
