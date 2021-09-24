import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../components/counter/counterSlice";
import clusterMapReducer from "../components/map/ReactMapSlice";
import authReducer from "../components/sessions/AuthSlice";
import routeReducer from "../components/location/RouteSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    clusterMap: clusterMapReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
