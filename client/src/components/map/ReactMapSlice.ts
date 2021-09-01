import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoJsonProperties, Geometry } from "geojson";
import { RootState } from "../../app/store";
import { createLocation } from "./mapService";

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
    createdAt: Date;
  };
}

export interface FeatureCreateDTO {
  properties: {
    name: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

export interface IFeatureCollection extends GeoJSON.FeatureCollection {
  features: IFeature[];
}
export interface ClusterMapState {
  locations: IFeatureCollection;
  renderedLocationsIds: string[];
  focusedLocationID: string | null;
  toggleCreateLocationMode: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: ClusterMapState = {
  focusedLocationID: null,
  locations: {
    type: "FeatureCollection",
    features: [],
  },
  renderedLocationsIds: [],
  toggleCreateLocationMode: false,
  status: "idle",
};

export const createLocationAsync = createAsyncThunk(
  "locations/createLocation",
  async (createDTO: FeatureCreateDTO) => {
    return await createLocation(createDTO);
  }
);

export const clusterMapSlice = createSlice({
  name: "clusterMap",
  initialState,
  reducers: {
    toggleCreateLocationMode: (state) => {
      state.toggleCreateLocationMode = !state.toggleCreateLocationMode;
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
      state.locations.features = [];
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
        state.toggleCreateLocationMode = false;
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
} = clusterMapSlice.actions;
export const selectClusterMap = (state: RootState) => state.clusterMap;

export default clusterMapSlice.reducer;
