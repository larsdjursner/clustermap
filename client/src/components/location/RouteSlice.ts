import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Genre, IRoute } from "../map/ReactMapSlice";

export interface RouteState {
  status: "idle" | "loading" | "failed";
}

const initialState: RouteState = {
  status: "idle",
};

export const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<{ genre: Genre }>) => {},
  },
});

export const { setGenre } = routeSlice.actions;
// export const selectRoute = (state: RootState) => state.route;

export default routeSlice.reducer;
