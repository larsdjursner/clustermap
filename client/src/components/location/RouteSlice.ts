import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IFeature } from "../map/ReactMapSlice";
import { createRoute } from "./routeService";

//take from backend when needed
export enum Enum {}

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


export interface RouteState {
  status: "idle" | "loading" | "failed";
  routeToCreate: RouteDTO;
}

export interface RouteDTO {
  feature?: IFeature;
  name?: string;
  grade?: Grade;
  genre?: Genre;
  characteristics?: Characteristic[];
  topology?: Topology[];
}

export interface IRoute {
  name: string;
  feature: IFeature;
  grade?: Grade;
  characteristics?: Characteristic[];
  topology?: Topology[];
  genre?: Genre;
}


const initialState: RouteState = {
  status: "idle",
  routeToCreate: {},
};

export const createRouteAsync = createAsyncThunk(
  "routes/createRoute",
  async (createDTO: IRoute) => {
    return await createRoute(createDTO);
  }
);
export const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setFeature: (state, action: PayloadAction<{ feature: IFeature }>) => {
      state.routeToCreate.feature = action.payload.feature;
    },
    setName: (state, action: PayloadAction<{ name: string }>) => {
      state.routeToCreate.name = action.payload.name;
    },
    setGrade: (state, action: PayloadAction<{ grade: Grade }>) => {
      state.routeToCreate.grade = action.payload.grade;
    },
    setGenre: (state, action: PayloadAction<{ genre: Genre }>) => {
      state.routeToCreate.genre = action.payload.genre;
    },
    setCharacteristics: (
      state,
      action: PayloadAction<{ characteristics: Characteristic[] }>
    ) => {
      state.routeToCreate.characteristics = action.payload.characteristics;
    },
    setTopology: (state, action: PayloadAction<{ topology: Topology[] }>) => {
      state.routeToCreate.topology = action.payload.topology;
    },
  },
});

export const {
  setGenre,
  setCharacteristics,
  setFeature,
  setGrade,
  setName,
  setTopology,
} = routeSlice.actions;
export const selectRoute = (state: RootState) => state.route;

export default routeSlice.reducer;


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
