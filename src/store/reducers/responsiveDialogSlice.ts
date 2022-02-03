import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const responsiveDialogSlice = createSlice({
  name: "responsiveDialog",
  initialState: {
    vertical: "top",
    horizontal: "center",
    responsiveDialogOpen: false,
    responsiveDialogPromptMessage: undefined,
    responsiveDialogConfirmed: undefined,
    responsiveDialogRejected: undefined,
    responsiveDialogContentText: undefined,
  } as Application.IResponsiveDialogState,
  reducers: {
    displayResponsiveDialog: (
      state: Application.IResponsiveDialogState,
      action: PayloadAction<Application.IResponsiveDialogState>
    ) => {
      state.responsiveDialogOpen = true;
      state.responsiveDialogPromptMessage =
        action.payload.responsiveDialogPromptMessage;
      state.responsiveDialogContentText =
        action.payload.responsiveDialogContentText;
      state.responsiveDialogConfirmText =
        action.payload.responsiveDialogConfirmText;
      state.responsiveDialogRejectText =
        action.payload.responsiveDialogRejectText;
    },
    confirmResponsiveDialog: (state: Application.IResponsiveDialogState) => {
      state.responsiveDialogOpen = false;
      state.responsiveDialogConfirmed = true;
      state.responsiveDialogRejected = false;
    },
    rejectResponsiveDialog: (state: Application.IResponsiveDialogState) => {
      state.responsiveDialogOpen = false;
      state.responsiveDialogConfirmed = false;
      state.responsiveDialogRejected = true;
    },
    hideResponsiveDialog: (state: Application.IResponsiveDialogState) => {
      state.responsiveDialogOpen = false;
      state.responsiveDialogConfirmed = undefined;
      state.responsiveDialogRejected = undefined;
    },
  },
});

export const {
  displayResponsiveDialog,
  hideResponsiveDialog,
  confirmResponsiveDialog,
  rejectResponsiveDialog,
} = responsiveDialogSlice.actions;

export default responsiveDialogSlice.reducer;
