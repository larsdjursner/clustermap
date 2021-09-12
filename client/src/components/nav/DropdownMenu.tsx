import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../sessions/AuthSlice";
import { FC } from "react";

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
      {children}
    </div>
  );
};
export default DropdownMenu;
