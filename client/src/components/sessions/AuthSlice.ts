import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IUser {
  email: string;
}
export interface AuthState {
  isAuth: boolean;
  user: IUser | null;
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
    setAuth: (state, action: PayloadAction<{ user: { email: string } }>) => {
      state.isAuth = true;
      state.user = action.payload.user;
    },
    signOut: (state) => {
        state.isAuth = false;
        state.user = null;
    }
  },
});

export const { setAuth, signOut} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
