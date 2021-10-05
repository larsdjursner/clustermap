import { FC } from "react";
import { IRoute } from "../RouteSlice";

interface Props {
  routes: IRoute[];
}

const RouteDiagram: FC<Props> = ({ routes }) => {
  return (
    <div className={"w-3/4 h-1/4 bg-gray-200 rounded-2xl flex justify-center"}>
      <div className={"flex flex-col justify-center"}>
        <p>{`visualization of the ${routes.length} routes and their grade`}</p>
      </div>
    </div>
  );
};

export default RouteDiagram;
