import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ILocation {
  lon: number;
  lat: number;
  name: string;
}

export interface ClusterMapState {
  locations: ILocation[];
  status: "idle" | "loading" | "failed";
}

const initialState: ClusterMapState = {
  locations: [
    {
      lat: 55.5,
      lon: 12.5,
      name: "one spot",
    },
    {
      lat: 55.6,
      lon: 12.6,
      name: "another spot",
    },
  ],
  status: "idle",
};

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const clusterMapSlice = createSlice({
  name: "clusterMap",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.locations.push({
        lon: getRandomArbitrary(12.5, 12.6),
        lat: getRandomArbitrary(55.5, 55.6),
        name: action.payload,
      });
    },
    clear: (state) => {
      state.locations = [];
    },
  },
});

export const { add, clear } = clusterMapSlice.actions;
export const selectClusterMap = (state: RootState) => state.clusterMap;

export default clusterMapSlice.reducer;
