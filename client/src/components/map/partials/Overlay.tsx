import { FC } from "react";

const Overlay: FC = ({ children }) => {
  return (
    <div className={"flex justify-between m-2 h-4/5 max-h-4/5 min-h-4/5 "}>
      {children}
    </div>
  );
};

export default Overlay;
