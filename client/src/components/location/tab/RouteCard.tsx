import { FC } from "react";
import { IRoute } from "../RouteSlice";

interface Props {
  route: IRoute;
}

const RouteCard: FC<Props> = ({ route }) => {
  return (
    <li className={"bg-gray-200 m-2 rounded-lg h-20"} key={route.id}>
      {route.name}
    </li>
  );
};

export default RouteCard;
