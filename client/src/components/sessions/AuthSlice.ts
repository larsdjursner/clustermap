import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import fire from "../../fire";

export interface User {
  id: string;
  email: string | null;
  displayName: string | null;
}

export interface AuthState {
  isAuth: boolean;
  user: User | null;
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
    setAuth: (state, action: PayloadAction<{ user: User }>) => {
      const user = action.payload.user;
      if (user !== null) {
        state.isAuth = true;
        state.user = user;
      }
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
