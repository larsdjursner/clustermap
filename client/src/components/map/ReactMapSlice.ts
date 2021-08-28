import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoJsonProperties, Geometry } from "geojson";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";

enum GradeEnum {
  ez,
  toomuch,
}
enum GenreEnum {
  Bouldering,
  SportsClimbing,
  TraditionalClimbing,
}
enum CharacteristicsEnum {}

interface IRoute {
  name: string;
  grade?: GradeEnum;
  characteristics?: CharacteristicsEnum;
}

interface ILocation {
  area: string;
  country: string;
}

export interface IFeature extends GeoJSON.Feature<Geometry, GeoJsonProperties> {
  id: string;
  properties: {
    name: string;
    details?: string;
    genre?: GenreEnum[];
    characteristics?: CharacteristicsEnum[];
    rating?: number;
    routes?: IRoute[];
    location?: ILocation;
    createdAt: Date
  };
}

export interface IFeatureCollection extends GeoJSON.FeatureCollection {
  features: IFeature[];
}
export interface ClusterMapState {
  locations: IFeatureCollection;
  renderedLocationsIds: string[];
  focusedLocationID: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: ClusterMapState = {
  focusedLocationID: null,
  locations: {
    type: "FeatureCollection",
    features: [],
  },
  renderedLocationsIds: [],
  status: "idle",
};

export const clusterMapSlice = createSlice({
  name: "clusterMap",
  initialState,
  reducers: {
    setLocationsAPI: (
      state,
      action: PayloadAction<{ locations: IFeature[] }>
    ) => {
      state.locations.features = [...action.payload.locations];
    },
    setRenderedLocationIds: (
      state,
      action: PayloadAction<{ ids: string[] }>
    ) => {
      state.renderedLocationsIds = [...action.payload.ids];
    },
    setFocusedLocationId: (
      state,
      action: PayloadAction<{ id: string | null }>
    ) => {
      state.focusedLocationID = action.payload.id;
    },
    addLocation: (
      state,
      action: PayloadAction<{
        name: string;
        coordinates: [number, number];
        details?: string;
      }>
    ) => {},
    clear: (state) => {
      state.locations.features = [];
    },
    deleteLocation: (state, action: PayloadAction<{ id: string }>) => {},
  },
});

export const {
  addLocation,
  clear,
  deleteLocation,
  setFocusedLocationId,
  setRenderedLocationIds,
  setLocationsAPI,
} = clusterMapSlice.actions;
export const selectClusterMap = (state: RootState) => state.clusterMap;

export default clusterMapSlice.reducer;
