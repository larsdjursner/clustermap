import { IRoute, RouteDTO } from "./RouteSlice";

const API_URI = process.env.REACT_APP_API_URI!;

const jwt = localStorage.getItem("jwt")
  ? localStorage.getItem("jwt")
  : sessionStorage.getItem("jwt");
const token = `Bearer ${jwt}`;

const createRoute = async (route: RouteDTO) => {
  setTimeout(() => {
    console.log("thunk", JSON.stringify(route));
  }, 1000);
  //   return fetch(`${API_URI}/locations`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //     body: JSON.stringify(route),
  //   }).then((res) => res.json());
};

export { createRoute };
