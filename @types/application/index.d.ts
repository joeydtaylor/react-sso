declare namespace Application {
  export interface IDataTableState {
    selectedRows: GridSelectionModel | any;
    isLoading: boolean;
    data?: any;
  }

  export interface IAuthenticationContext {
    user?: IUser;
    currentRole?: IRole;
    authenticationSource?: IAuthenticationSource;
  }

  export interface IConfiguration {
    authenticationServiceBaseUrl: string;
    appBaseUrl: string;
    apiBaseUrl: string;
  }

  export interface IResponsiveDialogState {
    responsiveDialogContentText?: string | any;
    responsiveDialogOpen: boolean;
    responsiveDialogPromptMessage?: string | undefined;
    responsiveDialogConfirmText?: string;
    responsiveDialogRejectText?: string;
    responsiveDialogConfirmed?: boolean;
    responsiveDialogRejected?: boolean;
  }

  export interface ISnackbarState {
    vertical?: string | any;
    horizontal?: string | any;
    snackbarType: "error" | "success" | "info" | "warning" | undefined;
    snackbarOpen?: boolean;
    snackbarMessage: string | undefined;
  }

  export interface IUserState extends IAuthenticationContext {
    isLoggedIn?: boolean;
    isLoggingIn?: boolean;
    isLoggingOut?: boolean;
    isLoading?: boolean;
    firstLoad?: boolean;
    sessionExpires?: Date;
    errors?: any;
    isLoggedOut?: boolean;
  }

  export type ErrorState = {
    message: any;
    requestOptions?: any;
  };
}
