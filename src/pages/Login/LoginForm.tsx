import { useState, useEffect } from "react";
import {
  Button,
  FormControlLabel,
  TextField,
  Checkbox,
  Tooltip,
  ClickAwayListener,
  Typography,
} from "@material-ui/core";
import {
  loginWithSaml,
  loginWithOidc,
  loginWithLocalSession,
  loginRequest,
} from "src/store/reducers/userSlice";
import { displaySnackbar } from "src/store/reducers/snackbarSlice";
import useStyles from "./useStyles";
import { useAppDispatch } from "src/utils/hooks";
import { gql, useQuery } from "@apollo/client";

type LoginState = {
  username: string;
  password: string;
  authenticationMethod: string;
  rememberMe: boolean;
  rememberMeTooltipOpen: boolean;
  enabledAuthenticationMethods: {
    oidcEnabled: boolean;
    samlEnabled: boolean;
    localEnabled: boolean;
  };
};

const LoginForm: React.FunctionComponent = () => {
  const [state, setState] = useState<LoginState>({
    username: "",
    password: "",
    authenticationMethod: "",
    rememberMe: false,
    rememberMeTooltipOpen: false,
    enabledAuthenticationMethods: {
      oidcEnabled: false,
      samlEnabled: false,
      localEnabled: false,
    },
  });

  const classes = useStyles();

  const dispatch = useAppDispatch();

  const {
    loading: getConfigurationLoading,
    error: getConfigurationError,
    data: getConfigurationData,
  } = useQuery(gql`
    query {
      getConfiguration {
        security {
          authentication {
            samlConfiguration {
              enabled
            }
            oidcConfiguration {
              enabled
            }
            localConfiguration {
              enabled
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    const handleLoginRequest = async () => {
      await dispatch(loginRequest());
      if (
        getConfigurationData &&
        !getConfigurationLoading &&
        !getConfigurationError
      ) {
        await setState((state) => ({
          ...state,
          enabledAuthenticationMethods: {
            oidcEnabled:
              getConfigurationData["getConfiguration"].security.authentication
                .oidcConfiguration.enabled,
            samlEnabled:
              getConfigurationData["getConfiguration"].security.authentication
                .samlConfiguration.enabled,
            localEnabled:
              getConfigurationData["getConfiguration"].security.authentication
                .localConfiguration.enabled,
          },
        }));
      }
    };
    handleLoginRequest();
  }, [
    dispatch,
    getConfigurationLoading,
    getConfigurationError,
    getConfigurationData,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setState((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (
      state.username &&
      state.password &&
      state.authenticationMethod === "local"
    ) {
      dispatch(
        loginWithLocalSession(state.username, state.password, state.rememberMe)
      );
    } else if (
      (!state.username && state.authenticationMethod === "local") ||
      (!state.password && state.authenticationMethod === "local")
    ) {
      dispatch(
        displaySnackbar({
          snackbarType: "error",
          snackbarMessage:
            "You must supply a username and password for local login!",
        })
      );
    }
  };

  const handleSamlAuthentication = (): void => {
    dispatch(loginWithSaml());
  };

  const handleOidcAuthentication = (): void => {
    dispatch(loginWithOidc());
  };

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      {state.enabledAuthenticationMethods.localEnabled && (
        <>
          <TextField
            className={classes.loginText}
            InputProps={{ classes: { input: classes.loginText } }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            placeholder="* Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            className={classes.loginText}
            InputProps={{ classes: { input: classes.loginText } }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="* Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <div>
            <ClickAwayListener
              onClickAway={() => {
                setState({ ...state, rememberMeTooltipOpen: false });
              }}
            >
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                open={state.rememberMeTooltipOpen}
                className={classes.tooltip}
                disableFocusListener
                disableHoverListener
                placement="top"
                disableTouchListener
                title="Remember me is currently only supported for local accounts"
              >
                <Typography component="h1" variant="h5" color="textPrimary">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.rememberMe}
                        onChange={() => {
                          setState({
                            ...state,
                            rememberMe: state.rememberMe ? false : true,
                            rememberMeTooltipOpen: state.rememberMe
                              ? false
                              : true,
                          });
                        }}
                      />
                    }
                    color="secondary"
                    label="Remember me"
                  />
                </Typography>
              </Tooltip>
            </ClickAwayListener>
          </div>
        </>
      )}
      {state.enabledAuthenticationMethods.localEnabled && (
        <Button
          type="submit"
          onClick={async () => {
            await setState({ ...state, authenticationMethod: "local" });
          }}
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          <Typography variant="button" className={classes.multilineColor}>
            Sign in locally
          </Typography>
        </Button>
      )}
      {state.enabledAuthenticationMethods.samlEnabled && (
        <Button
          fullWidth
          variant="contained"
          className={classes.submit}
          onClick={async () => {
            await setState({ ...state, authenticationMethod: "saml" });
            await dispatch(
              displaySnackbar({
                snackbarType: "info",
                snackbarMessage: "Redirecting to external provider",
              })
            );
            handleSamlAuthentication();
          }}
        >
          <Typography variant="button" className={classes.multilineColor}>
            Sign in with SAML
          </Typography>
        </Button>
      )}
      {state.enabledAuthenticationMethods.oidcEnabled && (
        <Button
          fullWidth
          variant="contained"
          className={classes.submit}
          onClick={async () => {
            await setState({ ...state, authenticationMethod: "oidc" });
            await dispatch(
              displaySnackbar({
                snackbarType: "info",
                snackbarMessage: "Redirecting to external provider",
              })
            );
            handleOidcAuthentication();
          }}
        >
          <Typography variant="button" className={classes.multilineColor}>
            Sign in with OIDC
          </Typography>
        </Button>
      )}
    </form>
  );
};

export default LoginForm;
