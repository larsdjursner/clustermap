import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import fire from "../../fire";

export interface User {
  id: string;
  email: string | null;
}

export interface AuthState {
  isAuth: boolean;
  // user: User | null;
  user: firebase.default.User | null;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
};

//needs to be elaborated upon - separation of concerns
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ user: firebase.default.User | null }>
    ) => {
      if (action.payload.user === null) {
        state.isAuth = false;
        state.user = null;
        return;
      }
      state.isAuth = true;
      state.user = action.payload.user;
    },
    signOut: (state) => {
      fire.auth().signOut();
      state.isAuth = false;
      state.user = null;
    },
  },
});

export const { setAuth, signOut } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
