import { FC } from "react";
import { IRoute } from "../RouteSlice";

interface Props {
  route: IRoute;
}

const RouteCard: FC<Props> = ({ route }) => {
  return (
    <li
      key={`route${route.id}`}
      className={"bg-gray-200 m-2 rounded-lg h-20"}
    >
      {route.name}
    </li>
  );
};

export default RouteCard;
