import { FC } from "react";
import { useAppSelector } from "../../../app/hooks";
import { IFeature } from "../../map/ReactMapSlice";
import { IRoute, selectRoute } from "../RouteSlice";
interface Props {
  location: IFeature;
}

const RouteList: FC<Props> = ({ location }) => {
  const routeState = useAppSelector(selectRoute);

  return (
    <ul>
      {routeState.featureRoutes.map((route) => (
        <li className={"bg-gray-200 my-2 rounded-sm w-1/6"} key={route.id}>
          {route.name}
        </li>
      ))}
    </ul>
  );
};

export default RouteList;
