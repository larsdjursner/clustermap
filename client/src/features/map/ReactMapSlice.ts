import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";
export interface IFeature extends GeoJSON.Feature {
  properties: {
    id: string;
    name: string;
    details?: string;
  };
}
export interface IFeatureCollection extends GeoJSON.FeatureCollection {
  features: IFeature[];
}
export interface IViewport {
  longitude: number | undefined;
  latitude: number | undefined;
  zoom: number | undefined;
  pitch: number;
  bbox?: {
    maxlat: number;
    maxlon: number;
    minlat: number;
    minlon: number;
  };
  transitionDuration?: number;
}
export interface ClusterMapState {
  viewportState: IViewport;
  locations: IFeatureCollection;
  idsWithinViewport: {
    clusteredIds: string[];
    unclusteredIds: string[];
  };
  status: "idle" | "loading" | "failed";
}

const initialState: ClusterMapState = {
  viewportState: {
    longitude: 12.53887,
    latitude: 55.64115,
    zoom: 9,
    pitch: 0,
  },
  idsWithinViewport: {
    clusteredIds: [],
    unclusteredIds: [],
  },
  locations: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "unclustered", id: uuidv4() },
        geometry: { type: "Point", coordinates: [12.45887, 55.64115] },
      },
      {
        type: "Feature",
        properties: { name: "Test Location", id: uuidv4() },
        geometry: { type: "Point", coordinates: [12.53887, 55.64115] },
      },
      {
        type: "Feature",
        properties: { name: "Test Location2", id: uuidv4() },
        geometry: { type: "Point", coordinates: [12.52887, 55.62115] },
      },
    ],
  },
  status: "idle",
};

export const clusterMapSlice = createSlice({
  name: "clusterMap",
  initialState,
  reducers: {
    setClusteredIDS: (
      state,
      action: PayloadAction<{ s: string[];}>
    ) => {
      // state.clusteredids = [...action.payload.s, ...action.payload.s2];
    },
    updateViewport: (
      state,
      action: PayloadAction<{
        longitude: number | undefined;
        latitude: number | undefined;
        zoom: number | undefined;
        pitch?: number;
        transitionDuration?: number;
      }>
    ) => {
      state.viewportState = {
        ...state.viewportState,
        ...action.payload,
      };
    },
    addLocation: (
      state,
      action: PayloadAction<{
        name: string;
        coordinates: [number, number];
        details?: string;
      }>
    ) => {
      const dto: IFeature = {
        type: "Feature",
        properties: {
          name: action.payload.name,
          id: uuidv4(),
          details: action.payload.details,
        },
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
    deleteLocation: (state, action: PayloadAction<{id :string}>) => {
      const { id } = action.payload;
      state.locations.features = state.locations.features.filter(
        (l) => l.properties.id !== id
      );
    },
  },
});

export const {
  addLocation,
  clear,
  deleteLocation,
  updateViewport,
  setClusteredIDS,
} = clusterMapSlice.actions;
export const selectClusterMap = (state: RootState) => state.clusterMap;

export default clusterMapSlice.reducer;
