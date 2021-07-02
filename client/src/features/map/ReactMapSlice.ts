import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";

export interface Coordinate {
  lon: number;
  lat: number;
}
export interface ILocation extends Coordinate {
  name: string;
  id: string;
}

export interface ClusterMapState {
  locations: ILocation[];
  status: "idle" | "loading" | "failed";
}



const initialState: ClusterMapState = {
  locations: [
    {
      lat: 55.68,
      lon: 12.58,
      name: "one spot",
      id: "test1",
    },
    {
      lat: 55.69,
      lon: 12.69,
      name: "another spot",
      id: "test2",
    },
  ],
  status: "idle",
};

export const clusterMapSlice = createSlice({
  name: "clusterMap",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<ILocation>) => {
      state.locations.push({
        lon: action.payload.lon,
        lat: action.payload.lat,
        name: action.payload.name,
        id: uuidv4(),
      });
    },
    clear: (state) => {
      state.locations = [];
    },
    deleteLocation: (state, action: PayloadAction<ILocation>) => {
      const { id } = action.payload;
      state.locations = state.locations.filter((l) => l.id !== id);
    },
  },
});

export const { addLocation, clear, deleteLocation } = clusterMapSlice.actions;
export const selectClusterMap = (state: RootState) => state.clusterMap;

export default clusterMapSlice.reducer;
