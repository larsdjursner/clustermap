import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { features } from "process";
import { GeneratedIdentifierFlags } from "typescript";
import { RootState } from "../../app/store";
import { IFeature } from "../map/ReactMapSlice";
import { createRoute } from "./routeService";

export interface RouteState {
  status: "idle" | "loading" | "failed";
  featureRoutes: IRoute[];
  routeToCreate: IRoute | null;
}

type ParamType =
  | "Feature"
  | "Grade"
  | "Genre"
  | "Name"
  | "Characteristics"
  | "Topology";

export interface RouteDTO {
  name?: string;
  featureId?: string;
  grade?: string;
  genre?: string;
  characteristics?: string[];
  topology?: string[];
}
export interface IRoute {
  name: string;
  featureId: string;
  grade?: string;
  genre?: string;
  characteristics?: string[];
  topology?: string[];
}

const initialState: RouteState = {
  status: "idle",
  featureRoutes: [],
  routeToCreate: null,
};

export const createRouteAsync = createAsyncThunk(
  "routes/createRoute",
  async (route: IRoute) => {
    return await createRoute(route);
  }
);

export const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    resetFeature: (state) => {
      state.routeToCreate = null;
    },
    setFeature: (state, action: PayloadAction<{ featureId: string }>) => {
      state.routeToCreate = {
        name: "",
        featureId: action.payload.featureId,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRouteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRouteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // state.featureRoutes = [...state.featureRoutes, action.payload]
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
  font7cp: "7cp",
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

// setParam: (
//   state,
//   action: PayloadAction<{ paramType: ParamType; param: string | string[] }>
// ) => {
//   switch (action.payload.paramType) {
//     case "Feature":
//       if (typeof action.payload.param === "string") {
//         state.routeToCreate.featureId = action.payload.param;
//       }
//       break;

//     case "Name":
//       if (typeof action.payload.param === "string") {
//         state.routeToCreate.name = action.payload.param;
//       }
//       break;

//     case "Genre":
//       if (typeof action.payload.param === "string") {
//         state.routeToCreate.genre = action.payload.param;
//       }
//       break;

//     case "Grade":
//       if (typeof action.payload.param === "string") {
//         state.routeToCreate.grade = action.payload.param;
//       }
//       break;
//     case "Characteristics":
//       if (Array.isArray(action.payload.param)) {
//         state.routeToCreate.characteristics = action.payload.param;
//       }
//       break;

//     case "Topology":
//       if (Array.isArray(action.payload.param)) {
//         state.routeToCreate.topology = action.payload.param;
//       }
//       break;
//     default:
//       break;
//   }
// },
// // //take from backend when needed
// export enum Enum {}

// export enum Grade {
//   font3 = "3",
//   font4 = "4",
//   font5 = "5",
//   font5p = "5+",
//   font6a = "6a",
//   font6ap = "6a+",
//   font6b = "6b",
//   font6bp = "6b+",
//   font6c = "6c",
//   font6cp = "6c+",
//   font7a = "7a",
//   font7ap = "7a+",
//   font7bp = "7b+",
//   font7c = "7c",
//   font7cp = "7cp",
//   font8a = "8a",
//   font8ap = "8a+",
//   font8b = "8b",
//   font8bp = "8b+",
//   font9a = "9a",
//   font9ap = "9a+",
//   font9b = "9b",
// }
// export enum Genre {
//   Bouldering = "Bouldering",
//   SportsClimbing = "Sports Climbing",
//   TraditionalClimbing = "Traditional Climbing",
// }

// export enum Topology {
//   Slab = "Slab",
//   Overhang = "Overhang",
//   Vertical = "Vertical",
//   Arete = "Arete",
//   Dihedral = "Dihedral",
// }

// export enum Characteristic {
//   Crimps = "Crimps",
//   Jugs = "Jugs",
//   Pinches = "Pinches",
//   Slopes = "Slopes",
//   Dynamic = "Dynamic",
//   Static = "Static",
//   Technical = "Technical",
//   Powerful = "Powerful",
// }
