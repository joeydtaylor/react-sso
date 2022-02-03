import React, { useCallback, useState } from "react";
import { RouteProps } from "react-router-dom";
import { displaySnackbar } from "src/store/reducers/snackbarSlice";
import { shallowEqual } from "react-redux";
import { RootState } from "src/store/store";
import Loading from "./Loading";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";

interface ProtectedRouteProps extends RouteProps {
  routeRoleRequirement: Array<string>;
  component: any;
}

const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = React.memo(
  ({ component: Component, ...rest }) => {
    const dispatch = useAppDispatch();
    const user: Application.IUserState = useAppSelector(
      (state: RootState) => state.user,
      shallowEqual
    );
    const [authorizationFailure, setAuthorizationFailure] = useState(false);
    const [authenticationFailure, setAuthenticationFailure] = useState(false);
    let {
      isLoading,
      isLoggedIn,
      isLoggingIn,
      isLoggingOut,
      isLoggedOut,
      currentRole,
    } = user;

    const handleFailureDisplay = useCallback(() => {
      const showErrors = async () => {
        const delay = async (n: number) =>
          new Promise((resolve) => {
            setTimeout(resolve, n * 1000);
          });

        const showAuthenticationFailure = async () => {
          if (
            authenticationFailure === true &&
            isLoggingIn === false &&
            isLoggingOut === false &&
            isLoggedOut === false
          ) {
            await dispatch(
              displaySnackbar({
                snackbarType: "error",
                snackbarMessage: "You need to log in to view this resource!",
              })
            );
            await delay(1);
            window.location.href = "/login";
          }
        };
        const showAuthorizationFailure = async () => {
          if (
            authorizationFailure === true &&
            isLoggingIn === false &&
            isLoggingOut === false &&
            isLoggedOut === false
          ) {
            await dispatch(
              displaySnackbar({
                snackbarType: "error",
                snackbarMessage:
                  "You do not currently have access to this resource! Please request access from your Administrator.",
              })
            );
            await delay(3);
            window.location.href = "/";
          }
        };
        await Promise.all([
          showAuthorizationFailure(),
          showAuthenticationFailure(),
        ]);
      };
      showErrors();
    }, [
      dispatch,
      authenticationFailure,
      authorizationFailure,
      isLoggingIn,
      isLoggedOut,
      isLoggingOut,
    ]);

    const RenderComponent = (props: any) => {
      if (isLoading === true) {
        return (
          <div>
            <Loading />
          </div>
        );
      }
      if (
        (isLoggedIn === true &&
          rest.routeRoleRequirement.includes("allAuthenticated")) ||
        (currentRole?.name &&
          rest.routeRoleRequirement.includes(currentRole?.name)) ||
        (isLoggedIn === true && currentRole?.name === "admin")
      ) {
        return <Component {...props} />;
      }
      if (
        isLoggedIn === true &&
        isLoading === false &&
        isLoggedOut === false &&
        isLoggingOut === false
      ) {
        setAuthorizationFailure(true);
        handleFailureDisplay();
      } else {
        setAuthenticationFailure(true);
        handleFailureDisplay();
      }
      return <></>;
    };

    return <RenderComponent {...rest} />;
  }
);

export default ProtectedRoute;
