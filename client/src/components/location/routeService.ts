import { IRoute, CreateRouteDTO } from "./RouteSlice";

const API_URI = process.env.REACT_APP_API_URI!;

const jwt = localStorage.getItem("jwt")
  ? localStorage.getItem("jwt")
  : sessionStorage.getItem("jwt");
const token = `Bearer ${jwt}`;

const createRoute = async (route: CreateRouteDTO) => {
  return await fetch(`${API_URI}/climbingroutes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(route),
  }).then((res) => res.json());
};

// const fetchRoutesByFeature = async (featureId: string) => {
//   // return fetch(`${API_URI}/lo`)
// };

export { createRoute };
