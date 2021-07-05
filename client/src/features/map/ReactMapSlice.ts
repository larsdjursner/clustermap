import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";
import { IFeature, IFeatureCollection } from "./ReactMap";

export interface Coordinate {
  lon: number;
  lat: number;
}
export interface ILocation extends Coordinate {
  name: string;
  id: string;
}

export interface ClusterMapState {
  locations: IFeatureCollection;
  status: "idle" | "loading" | "failed";
}

const initialState: ClusterMapState = {
  locations: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        id: uuidv4(),
        properties: { name: "first" },
        geometry: { type: "Point", coordinates: [12.47, 55.66] },
      },
    ],
  },
  status: "idle",
};

export const clusterMapSlice = createSlice({
  name: "clusterMap",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<ILocation>) => {
      const dto: IFeature = {
        type: "Feature",
        id: uuidv4(),
        properties: { name: action.payload.name },
        geometry: {
          type: "Point",
          coordinates: [action.payload.lon, action.payload.lat],
        },
      };

      state.locations.features.push(dto);
    },
    clear: (state) => {
      state.locations.features = [];
    },
    deleteLocation: (state, action: PayloadAction<IFeature>) => {
      const { id } = action.payload;
      state.locations.features = state.locations.features.filter(
        (l) => l.id !== id
      );
    },
  },
});

export const { addLocation, clear, deleteLocation } = clusterMapSlice.actions;
export const selectClusterMap = (state: RootState) => state.clusterMap;

export default clusterMapSlice.reducer;
