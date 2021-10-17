import temp from "../../assets/temp.jpg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IFeature } from "../map/ReactMapSlice";
import { selectAuth } from "../sessions/AuthSlice";
import { FC, useEffect, useState } from "react";
import { fetchRoutesByFeatureIdAsync } from "./RouteSlice";
import TabGroup from "./tab/TabGroup";
import { useParams } from "react-router-dom";
import { fetchLocationFeatureById } from "../map/mapService";

const Location: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [location, setLocation] = useState<IFeature | null>(null);

  useEffect(() => {
    fetchLocationFeatureById(id)
      .then((res) => setLocation(res))
      .catch((err) => console.log(err));
    dispatch(fetchRoutesByFeatureIdAsync(id));
  }, []);
  return (
    <div className={"w-full"}>
      <div className={"h-screen3/4 w-full"}>
        <div
          style={{ backgroundImage: `url(${temp})` }}
          className={`object-cover w-full h-full object-right-bottom`}
        >
          <div className={`flex flex-col justify-center items-center h-full`}>
            <p className={`text-4xl text-white text font-black`}>
              {location?.properties.name}
            </p>
            <p className={`text-xl text-white`}>
              ______________________________________________
            </p>
            <p className={`text-xl text-white`}>{`Created by ....`}</p>
          </div>
        </div>
      </div>
      {location && <TabGroup location={location} />}
    </div>
  );
};

export default Location;
