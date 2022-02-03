import { configureStore, Action } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import { snackbarSlice } from "./reducers/snackbarSlice";
import { responsiveDialogSlice } from "./reducers/responsiveDialogSlice";
import { ThunkAction } from "redux-thunk";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    snackbar: snackbarSlice.reducer,
    responsiveDialog: responsiveDialogSlice.reducer,
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
export default store;
