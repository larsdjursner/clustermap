import { FeatureCreateDTO  } from "./ReactMapSlice";

const API_URI = process.env.REACT_APP_API_URI!;
const token = `Bearer ${localStorage.getItem("jwt")}`;

const fetchLocationFeatures = async () => {
  return await fetch(`${API_URI}/locations`).then((response) =>
    response.json()
  );
};

const createLocation = async (feature: FeatureCreateDTO) => {
  return fetch(`${API_URI}/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(feature),
  }).then((res) => res.json());
};

export { fetchLocationFeatures, createLocation };
