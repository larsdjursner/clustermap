import { FC } from "react";
import { useAppSelector } from "../../../app/hooks";
import { IFeature } from "../../map/ReactMapSlice";
import { selectAuth } from "../../sessions/AuthSlice";
import { selectRoute } from "../RouteSlice";
import AddRouteDisclosure from "./AddRouteDisclosure";
import RouteCard from "./RouteCard";
interface Props {
  location: IFeature;
}

const TabRouteList: FC<Props> = ({ location }) => {
  const routeState = useAppSelector(selectRoute);
  const auth = useAppSelector(selectAuth);

  return (
    <div className={"w-full flex flex-col justify-center"}>
      {auth.user?.id === location.properties.creatorId && (
        <AddRouteDisclosure location={location} />
      )}
      {routeState.featureRoutes.length > 0 && (
        <ul className={" max-h-96 mt-4 overflow-scroll bg-gray-400 rounded-lg"}>
          {routeState.featureRoutes.map((route) => (
            <RouteCard route={route} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TabRouteList;
