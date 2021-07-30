import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImportsNotUsedAsValues } from "typescript";
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
  rating?: number;
}

export interface IFeature extends GeoJSON.Feature {
  properties: {
    id: string;
    name: string;
    details?: string;
    genre?: GenreEnum[];
    characteristics?: CharacteristicsEnum[];
    rating?: number;
    routes?: IRoute[];
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
    features: [
      {
        type: "Feature",
        properties: {
          name: "Bob's Backyard Bouldering Crag",
          id: uuidv4(),
        },
        geometry: { type: "Point", coordinates: [12.45887, 55.64115] },
      },
      {
        type: "Feature",
        properties: {
          name: "Copenhagen Boulders",
          id: uuidv4(),
          details: "bouldering gym for boulder bros",
          genre: [GenreEnum.Bouldering],
          routes: [{ name: "" }],
        },
        geometry: { type: "Point", coordinates: [12.53887, 55.64115] },
      },
      {
        type: "Feature",
        properties: {
          name: "Clyde's Sports Climbing Crag",
          id: uuidv4(),
          details: "bring your own rope",
          genre: [GenreEnum.SportsClimbing],
          routes: [{ name: "Smack City", grade: GradeEnum.toomuch }],
        },
        geometry: { type: "Point", coordinates: [12.52887, 55.62115] },
      },
    ],
  },
  renderedLocationsIds: [],
  status: "idle",
};

export const clusterMapSlice = createSlice({
  name: "clusterMap",
  initialState,
  reducers: {
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
    deleteLocation: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.locations.features = state.locations.features.filter(
        (l) => l.properties.id !== id
      );

      state.renderedLocationsIds = state.renderedLocationsIds.filter(
        (l) => l !== id
      );
    },
  },
});

export const {
  addLocation,
  clear,
  deleteLocation,
  setFocusedLocationId,
  // updateViewport,
  setRenderedLocationIds,
} = clusterMapSlice.actions;
export const selectClusterMap = (state: RootState) => state.clusterMap;

export default clusterMapSlice.reducer;
