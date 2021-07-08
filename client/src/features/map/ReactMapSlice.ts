import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";
export interface IFeature extends GeoJSON.Feature {
  properties: {
    name: string;
  };
}
export interface IFeatureCollection extends GeoJSON.FeatureCollection {
  features: IFeature[];
}

export interface IViewport {
  width: number;
  height: number;
  longitude: number | undefined;
  latitude: number | undefined;
  zoom: number | undefined;
  pitch: number;
}
export interface ClusterMapState {
  viewportState: IViewport;
  locations: IFeatureCollection;
  status: "idle" | "loading" | "failed";
}

const initialState: ClusterMapState = {
  viewportState: {
    width: 1000,
    height: 600,
    longitude: 12.584787,
    latitude: 55.683839,
    zoom: 9,
    pitch: 0,
  },
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
    updateViewport: (
      state,
      action: PayloadAction<{
        longitude: number | undefined;
        latitude: number | undefined;
        zoom: number | undefined;
        pitch?: number;
      }>
    ) => {
      const { longitude, latitude, zoom, pitch } = action.payload;
      state.viewportState.longitude = longitude;
      state.viewportState.latitude = latitude;
      state.viewportState.zoom = zoom;
      state.viewportState.pitch = pitch ? pitch : state.viewportState.pitch;
    },
    addLocation: (
      state,
      action: PayloadAction<{ name: string; coordinates: [number, number] }>
    ) => {
      const dto: IFeature = {
        type: "Feature",
        id: uuidv4(),
        properties: { name: action.payload.name },
        geometry: {
          type: "Point",
          coordinates: action.payload.coordinates,
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

export const { addLocation, clear, deleteLocation, updateViewport } =
  clusterMapSlice.actions;
export const selectClusterMap = (state: RootState) => state.clusterMap;

export default clusterMapSlice.reducer;
