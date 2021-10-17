import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { createRoute, fetchRoutesByFeatureId } from "./routeService";

export interface RouteState {
  status: "idle" | "loading" | "failed";
  featureRoutes: IRoute[];
  routeToCreate: CreateRouteDTO | null;
}

type ParamType =
  | "Feature"
  | "Grade"
  | "Genre"
  | "Name"
  | "Characteristics"
  | "Topology";

export interface CreateRouteDTO {
  name: string;
  featureId: string;
  creatorId: string | undefined;
  grade?: string;
  genre?: string;
  characteristics?: string[];
  topology?: string[];
  description?: string;
}
export interface IRoute {
  name: string;
  id: string;
  featureId: string;
  creatorId: string;
  grade?: string;
  genre?: string;
  characteristics?: string[];
  topology?: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const initialState: RouteState = {
  status: "idle",
  featureRoutes: [],
  routeToCreate: null,
};

export const createRouteAsync = createAsyncThunk(
  "routes/createRoute",
  async (route: CreateRouteDTO) => {
    return await createRoute(route);
  }
);

export const fetchRoutesByFeatureIdAsync = createAsyncThunk(
  "routes/fetchRoutesByFeatureIdAsync",
  async (id: string) => {
    return await fetchRoutesByFeatureId(id);
  }
);

export const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setRoutes: (state, action: PayloadAction<{ routes: IRoute[] }>) => {
      state.featureRoutes = [...action.payload.routes];
    },
    resetFeature: (state) => {
      state.routeToCreate = null;
    },
    setFeature: (
      state,
      action: PayloadAction<{ featureId: string; userId: string | undefined }>
    ) => {
      state.routeToCreate = {
        name: "",
        featureId: action.payload.featureId,
        creatorId: action.payload.userId,
      };
    },
    setName: (state, action: PayloadAction<{ name: string }>) => {
      if (state.routeToCreate) {
        state.routeToCreate.name = action.payload.name;
      }
    },
    setGrade: (state, action: PayloadAction<{ grade: string }>) => {
      if (state.routeToCreate) {
        state.routeToCreate.grade = action.payload.grade;
      }
    },
    setGenre: (state, action: PayloadAction<{ genre: string }>) => {
      if (state.routeToCreate) {
        state.routeToCreate.genre = action.payload.genre;
      }
    },
    setCharacteristics: (
      state,
      action: PayloadAction<{ characteristics: string[] }>
    ) => {
      if (state.routeToCreate) {
        state.routeToCreate.characteristics = action.payload.characteristics;
      }
    },
    setTopology: (state, action: PayloadAction<{ topology: string[] }>) => {
      if (state.routeToCreate) {
        state.routeToCreate.topology = action.payload.topology;
      }
    },
    setDescription: (state, action: PayloadAction<{ description: string }>) => {
      if (state.routeToCreate) {
        state.routeToCreate.description = action.payload.description;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRouteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRouteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.featureRoutes = [...state.featureRoutes, action.payload];
      })
      .addCase(fetchRoutesByFeatureIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoutesByFeatureIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.featureRoutes = [...action.payload];
      });
  },
});

export const {
  resetFeature,
  setCharacteristics,
  setFeature,
  setGenre,
  setGrade,
  setName,
  setTopology,
  setRoutes,
  setDescription,
} = routeSlice.actions;
export const selectRoute = (state: RootState) => state.route;

export default routeSlice.reducer;

export const Grade = {
  font3: "3",
  font4: "4",
  font5: "5",
  font5p: "5+",
  font6a: "6a",
  font6ap: "6a+",
  font6b: "6b",
  font6bp: "6b+",
  font6c: "6c",
  font6cp: "6c+",
  font7a: "7a",
  font7ap: "7a+",
  font7bp: "7b+",
  font7c: "7c",
  font7cp: "7c+",
  font8a: "8a",
  font8ap: "8a+",
  font8b: "8b",
  font8bp: "8b+",
  font9a: "9a",
  font9ap: "9a+",
  font9b: "9b",
} as const;

export const Genre = {
  Bouldering: "Bouldering",
  SportsClimbing: "Sports Climbing",
  TraditionalClimbing: "Traditional Climbing",
} as const;

export const Topology = {
  Slab: "Slab",
  Overhang: "Overhang",
  Vertical: "Vertical",
  Arete: "Arete",
  Dihedral: "Dihedral",
} as const;

export const Characteristic = {
  Crimps: "Crimps",
  Jugs: "Jugs",
  Pinches: "Pinches",
  Slopes: "Slopes",
  Dynamic: "Dynamic",
  Static: "Static",
  Technical: "Technical",
  Powerful: "Powerful",
} as const;
