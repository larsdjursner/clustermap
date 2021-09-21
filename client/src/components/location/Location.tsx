import { useParams } from "react-router";
import temp from "../../assets/temp.jpg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectClusterMap } from "../map/ReactMapSlice";
import { selectAuth } from "../sessions/AuthSlice";
import RouteDiagram from "./RouteDiagram";
import { Link } from "react-router-dom";
import AddRouteDisclosure from "./AddRouteDisclosure";

interface Props {
  id: string;
}

const Location = () => {
  const clusterMap = useAppSelector(selectClusterMap);
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const { id } = useParams<Props>();
  const loc = clusterMap.locations.features
    .filter((l) => l.geometry.type === "Point")
    .find((l) => l.properties.featureId === id)!;

  return (
    <div className={"w-screen"}>
      <div className={"h-body w-full"}>
        <div
          style={{ backgroundImage: `url(${temp})` }}
          className={`object-cover w-full h-full object-right-bottom`}
        >
          <div className={`flex flex-row justify-center items-center h-full`}>
            <p className={`text-4xl text-white text font-black`}>
              {loc.properties.name}
            </p>
          </div>
        </div>
      </div>
      {loc.properties.creatorId === auth.user?.id && (
        <div className={"flex py-4 gap-4 bg-gray-600"}>
          <AddRouteDisclosure location={loc.properties.name}/>
        </div>
      )}

      <div
        className={`flex flex-col justify-center items-center h-80 bg-gray-900 w-full`}
      >
        <p className={`text-3xl text-white text font-black`}>
          {`Routes featured on ${loc.properties.name}`}
        </p>

        <p className={`text-lg text-white text py-4`}>
          {`${loc.properties.routes?.length || 0}`}
        </p>

        <RouteDiagram />

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
        </div>
      </div>
    </div>
  );
};

export default Location;
