import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { history } from "src/utils/history";
import { displaySnackbar } from "src/store/reducers/snackbarSlice";
import { config } from "../../config/config";
import { AppThunk } from "../store";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
    isLoggedIn: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isLoggedOut: false,
    isLoading: true,
    firstLoad: true,
    authenticationSource: undefined,
    sessionExpires: undefined,
    errors: undefined,
  } as Application.IUserState,
  reducers: {
    loginRequest: (state: Application.IUserState) => {
      state.isLoggingIn = true;
    },
    loginSuccess: (
      state: Application.IUserState,
      action: PayloadAction<Application.IUserState>
    ) => {
      state.errors = undefined;
      state.isLoggedIn = true;
      state.authenticationSource = action.payload.authenticationSource;
    },
    loginFailure: (
      state: Application.IUserState,
      action: PayloadAction<Application.IUserState>
    ) => {
      state.errors = {
        message: action.payload.errors.message,
        requestOptions: action.payload.errors.requestOptions,
      };
    },
    loadUserSuccess: (
      state: Application.IUserState,
      action: PayloadAction<Application.IUserState>
    ) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.firstLoad = false;
      state.sessionExpires = action.payload.sessionExpires;
      state.authenticationSource = action.payload.authenticationSource;
      state.user = action.payload.user;
      state.currentRole = action.payload.currentRole;
    },
    loadUserFailure: (
      state: Application.IUserState,
      action: PayloadAction<Application.IUserState>
    ) => {
      state.isLoading = false;
      state.errors = {
        message: action.payload.errors.message,
      };
    },
    logoutUserRequest: (state: Application.IUserState) => {
      state.user = undefined;
      state.isLoggingOut = true;
      state.isLoggingIn = false;
    },
    logoutUserSuccess: (state: Application.IUserState) => {
      state.user = undefined;
      state.sessionExpires = undefined;
      state.authenticationSource = undefined;
      state.isLoggedIn = false;
      state.isLoggingOut = false;
      state.isLoggedOut = true;
    },
    logoutUserFailure: (
      state: Application.IUserState,
      action: PayloadAction<Application.IUserState>
    ) => {
      state.errors = {
        message: action.payload.errors.message,
        requestOptions: action.payload.errors.requestOptions,
      };
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFailure,
  loadUserSuccess,
  loadUserFailure,
} = userSlice.actions;

const requestOptions: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const loginWithLocalSession =
  (username: string, password: string, rememberMe: boolean): AppThunk =>
  async (dispatch) => {
    await axios
      .post(
        `${config.authenticationServiceBaseUrl}/api/auth/local`,
        {
          username: username,
          password: password,
          rememberMe: rememberMe,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch(
          displaySnackbar({
            snackbarType: "success",
            snackbarMessage: "Login successful",
          })
        );
        dispatch(
          loginSuccess({
            authenticationSource: { provider: "local" },
          })
        );
        window.location.href = `${config.authenticationServiceBaseUrl}`;
      })
      .catch((e) => {
        dispatch(
          displaySnackbar({
            snackbarType: "error",
            snackbarMessage: "Login failed!",
          })
        );
        dispatch(
          loginFailure({
            errors: {
              message: e.message,
              requestOptions: {
                headers: { ...e.config.headers },
                method: e.config.method,
                withCredentials: e.config.withCredentials,
                url: e.config.url,
              },
            },
          })
        );
      });
  };

export const loginWithSaml = (): AppThunk => async () => {
  await history.push(
    `${config.authenticationServiceBaseUrl}/api/auth/saml/login`
  );
};

export const loginWithOidc = (): AppThunk => async () => {
  await history.push(
    `${config.authenticationServiceBaseUrl}/api/auth/oidc/login`
  );
};

export const loadUser = (): AppThunk => async (dispatch) => {
  let data = JSON.stringify({
    query: `query { 
      getUserContext { 
        username 
        role {
          name
        }
        authenticationSource {
          provider
        }
      } 
    }`,
    variables: {},
  });

  requestOptions !== undefined
    ? await axios
        .post(
          `${config.authenticationServiceBaseUrl}/graphql`,
          data,
          requestOptions
        )
        .then((res) => {
          let responseData = ({ data } = res.data.data);
          dispatch(
            loadUserSuccess({
              user: responseData.getUserContext.username,
              currentRole: responseData.getUserContext.role,
              authenticationSource:
                responseData.getUserContext.authenticationSource.provider,
            })
          );
        })
        .catch((e) =>
          dispatch(
            loadUserFailure({
              errors: {
                message: e.message,
              },
            })
          )
        )
    : dispatch(loadUserFailure({ errors: { message: "No request options" } }));
};

export const logoutUser = (): AppThunk => async (dispatch) => {

  requestOptions !== undefined
    ? await axios
        .get(
          `${config.authenticationServiceBaseUrl}/api/auth/logout`,
          requestOptions
        )
        .then(async () => {
          await dispatch(logoutUserSuccess());
          window.location.href = "/login";
        })
        .catch((e) =>
          dispatch(
            logoutUserFailure({
              errors: {
                message: e.message,
                requestOptions: {
                  headers: { ...e.config.headers },
                  method: e.config.method,
                  withCredentials: e.config.withCredentials,
                  url: e.config.url,
                },
              },
            })
          )
        )
    : dispatch(
        logoutUserFailure({ errors: { message: "No request options" } })
      );
};

export default userSlice.reducer;
