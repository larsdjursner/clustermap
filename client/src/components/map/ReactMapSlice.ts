import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoJsonProperties, Geometry } from "geojson";
import { RootState } from "../../app/store";
import { createLocation } from "./mapService";

//take from backend when needed
export enum Grade {
  font3 = "3",
  font4 = "4",
  font5 = "5",
  font5p = "5+",
  font6a = "6a",
  font6ap = "6a+",
  font6b = "6b",
  font6bp = "6b+",
  font6c = "6c",
  font6cp = "6c+",
  font7a = "7a",
  font7ap = "7a+",
  font7bp = "7b+",
  font7c = "7c",
  font7cp = "7cp",
  font8a = "8a",
  font8ap = "8a+",
  font8b = "8b",
  font8bp = "8b+",
  font9a = "9a",
  font9ap = "9a+",
  font9b = "9b",
}
export enum Genre {
  Bouldering = "Bouldering",
  SportsClimbing = "Sports Climbing",
  TraditionalClimbing = "Traditional Climbing",
}

export enum Topology {
  Slab = "Slab",
  Overhang = "Overhang",
  Vertical = "Vertical",
  Arete = "Arete",
  Dihedral = "Dihedral",
}

export enum Characteristic {
  Crimps = "Crimps",
  Jugs = "Jugs",
  Pinches = "Pinches",
  Slopes = "Slopes",
  Dynamic = "Dynamic",
  Static = "Static",
  Technical = "Technical",
  Powerful = "Powerful",
}
// export type GradeType =
//   | "3"
//   | "4"
//   | "5"
//   | "5+"
//   | "6a"
//   | "6a+"
//   | "6b"
//   | "6b+"
//   | "6c"
//   | "6c+"
//   | "7a"
//   | "7a+"
//   | "7b+"
//   | "7c"
//   | "7cp"
//   | "8a"
//   | "8a+"
//   | "8b"
//   | "8b+"
//   | "9a"
//   | "9a+"
//   | "9b";

// export type GenreType = "Bouldering" | "SportsClimbing" | "TraditionalClimbing";

// export type TopologyType =
//   | "Slab"
//   | "Overhang"
//   | "Vertical"
//   | "Arete"
//   | "Dihedral";

// export type CharacteristicType =
//   | "Crimpy"
//   | "Juggy"
//   | "Pinchy"
//   | "Slopey"
//   | "Dynamic"
//   | "Static"
//   | "Technical"
//   | "Powerful";

export interface IRoute {
  name: string;
  grade?: Grade;
  characteristics?: Characteristic[];
  topology?: Topology[];
  genre?: Genre;
  feature: IFeature;
}

interface ILocation {
  area: string;
  country: string;
}

export interface IFeature extends GeoJSON.Feature<Geometry, GeoJsonProperties> {
  properties: {
    featureId: string;
    name: string;
    createdAt: Date;
    creatorId: string;
    details?: string;
    routes?: IRoute[];
    location?: ILocation;
  };
}

export interface CreateFeatureDTO {
  properties: {
    name: string;
    creatorId: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

export interface CreateRouteDTO extends IRoute {}

export interface IFeatureCollection extends GeoJSON.FeatureCollection {
  features: IFeature[];
}
export interface ClusterMapState {
  locations: IFeatureCollection;
  renderedLocationsIds: string[];
  focusedLocationID: string | null;
  createLocationMode: boolean;
  createLocationCoordinates: [number, number] | null;
  status: "idle" | "loading" | "failed";
}

const initialState: ClusterMapState = {
  focusedLocationID: null,
  locations: {
    type: "FeatureCollection",
    features: [],
  },
  renderedLocationsIds: [],
  createLocationMode: false,
  createLocationCoordinates: null,
  status: "idle",
};

export const createLocationAsync = createAsyncThunk(
  "locations/createLocation",
  async (createDTO: CreateFeatureDTO) => {
    return await createLocation(createDTO);
  }
);

export const clusterMapSlice = createSlice({
  name: "clusterMap",
  initialState,
  reducers: {
    toggleCreateLocationMode: (state) => {
      state.createLocationMode = !state.createLocationMode;
      console.log(state.createLocationMode);
    },
    setCreateLocationCoordinates: (
      state,
      action: PayloadAction<{ coords: [number, number] }>
    ) => {
      state.createLocationCoordinates = action.payload.coords;
    },
    resetCreateLocationCoordinates: (state) => {
      state.createLocationCoordinates = null;
    },
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
    clear: (state) => {
      state.focusedLocationID = null;
      state.renderedLocationsIds = [];
    },
    deleteLocation: (state, action: PayloadAction<{ id: string }>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLocationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLocationAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.createLocationMode = false;
        state.locations.features = [
          ...state.locations.features,
          action.payload,
        ];
      });
  },
});

export const {
  clear,
  deleteLocation,
  setFocusedLocationId,
  setRenderedLocationIds,
  setLocationsAPI,
  toggleCreateLocationMode,
  setCreateLocationCoordinates,
  resetCreateLocationCoordinates,
} = clusterMapSlice.actions;
export const selectClusterMap = (state: RootState) => state.clusterMap;

export default clusterMapSlice.reducer;
