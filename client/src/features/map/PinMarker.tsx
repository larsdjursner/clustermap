import { FC, FunctionComponent, useState } from "react";
import { Marker, ViewportProps } from "react-map-gl";
import { ILocation } from "./ReactMapSlice";

interface IPinMarker {
  loc: ILocation;
  viewport: ViewportProps;
}

export const PinMarker: FC<IPinMarker> = ({ loc, viewport }) => {
  return <></>
  // return (
    // <Marker
    //   latitude={loc.geometry.coordinates[1]}
    //   longitude={loc.geometry.coordinates[0]}
    //   offsetTop={-(viewport.zoom! * 2) / 2}
    //   offsetLeft={-(viewport.zoom! * 2) / 2}
    // >
    //   <img
    //     src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-256.png"
    //     width={viewport.zoom! * 2}
    //     height={viewport.zoom! * 2}
    //   />
    // </Marker>
  // );
};
