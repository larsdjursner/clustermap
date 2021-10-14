import temp from "../../assets/temp.jpg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IFeature, selectClusterMap } from "../map/ReactMapSlice";
import { selectAuth } from "../sessions/AuthSlice";
import { FC, useEffect, useState } from "react";
import { fetchRoutesByFeatureIdAsync } from "./RouteSlice";
import TabGroup from "./tab/TabGroup";
import fire from "../../fire";

interface Props {
  location: IFeature;
}
const Location: FC<Props> = ({ location }) => {
  // const clusterMap = useAppSelector(selectClusterMap);
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRoutesByFeatureIdAsync(location.properties.featureId));
  }, []);

  return (
    <div className={"w-screen"}>
      <div className={"h-screen3/4 w-full"}>
        <div
          style={{ backgroundImage: `url(${temp})` }}
          className={`object-cover w-full h-full object-right-bottom`}
        >
          <div className={`flex flex-col justify-center items-center h-full`}>
            <p className={`text-4xl text-white text font-black`}>
              {location.properties.name}
            </p>
            <p className={`text-xl text-white`}>
              ______________________________________________ 
            </p>
            <p className={`text-xl text-white`}>
              {`Created by ....`}
            </p>
          </div>
        </div>
      </div>
      <TabGroup location={location} />
    </div>
  );
};

export default Location;
