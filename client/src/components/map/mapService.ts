import { IFeature } from "./ReactMapSlice";

const API_URI = process.env.REACT_APP_API_URI!


const fetchLocationFeatures = async () => {
  return await fetch(`${API_URI}/locations`)
    .then((response) => response.json())
};

const createLocation = async(feature : IFeature) => {
  fetch(`${API_URI}/location`, )
}

export default fetchLocationFeatures;
