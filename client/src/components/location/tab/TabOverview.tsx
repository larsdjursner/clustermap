import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { IFeature } from "../../map/ReactMapSlice";
import RouteDiagram from "../partials/RouteDiagram";
import { selectRoute } from "../RouteSlice";
import DirectionsBtn from "./DirectionsBtn";
interface Props {
  location: IFeature;
}
const TabOverview: FC<Props> = ({ location }) => {
  const routeState = useAppSelector(selectRoute);

  return (
    <div
      className={`flex flex-col justify-center items-center h-80 bg-gray-900 w-full`}
    >
      <p className={`text-3xl text-white text font-black`}>
        {`Routes featured on ${location.properties.name}`}
      </p>

      <p className={`text-lg text-white text py-4`}>
        {`${routeState.featureRoutes.length} route(s)`}
      </p>

      <RouteDiagram routes={routeState.featureRoutes} />

      <div className={"flex py-4 gap-4"}>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
        >
          <Link to="/map">Go back to map</Link>
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
        >
          Add to favourites
        </button>

        <DirectionsBtn location={location} />
      </div>
    </div>
  );
};

export default TabOverview;
