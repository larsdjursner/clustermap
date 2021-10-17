// http://maps.google.com/maps?z=12&t=m&q=loc:38.9419+-78.

import { FC } from "react";
import { IFeature } from "../../map/ReactMapSlice";
interface Props {
  location: IFeature;
}

const DirectionsBtn: FC<Props> = ({ location }) => {
  if (location.geometry.type !== "Point") {
    return null;
  }
  const googleMapsURL = `http://maps.google.com/maps?z=12&t=m&q=loc:${location.geometry.coordinates[1]}+${location.geometry.coordinates[0]}`;

  const redirectToGoogle = () => {
    window.open(googleMapsURL, "_blank");
  };

  return (
    <button
      type="button"
      onClick={redirectToGoogle}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
    >
      Show directions to {location.properties.name}
    </button>
  );
};

export default DirectionsBtn;
