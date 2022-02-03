import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    vertical: "top",
    horizontal: "center",
    snackbarType: undefined,
    snackbarOpen: false,
    snackbarMessage: undefined,
  } as Application.ISnackbarState,
  reducers: {
    displaySnackbar: (
      state: Application.ISnackbarState,
      action: PayloadAction<Application.ISnackbarState>
    ) => {
      state.snackbarOpen = true;
      state.snackbarType = action.payload.snackbarType;
      state.snackbarMessage = action.payload.snackbarMessage;
    },
    hideSnackbar: (state: Application.ISnackbarState) => {
      state.snackbarOpen = false;
    },
  },
});

export const { displaySnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
