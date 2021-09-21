import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoJsonProperties, Geometry } from "geojson";
import { RootState } from "../../app/store";
import { createLocation } from "./mapService";

//take from backend when needed
enum GradeEnum {}
enum CharacteristicsEnum {}
enum GenreEnum {
  Bouldering,
  SportsClimbing,
  TraditionalClimbing,
}

export interface IRoute {
  name: string;
  grade?: GradeEnum;
  characteristics?: CharacteristicsEnum;
  genre?: GenreEnum;
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
