import { useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "src/pages/Login/Login";
import Home from "src/pages/Home/Home";
import { history } from "src/utils/history";
import Snackbar from "src/components/Snackbar";
import ProtectedRoute from "src/components/ProtectedRoute";
import { loadUser } from "src/store/reducers/userSlice";
import ResponsiveDialog from "./components/ResponsiveDialog";
import { useAppDispatch } from "./utils/hooks";

const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const instantiateUser = useCallback(async () => {
    if (history.location.pathname !== "/login") {
      await dispatch(loadUser());
    }
  }, [dispatch]);

  useEffect(() => {
    instantiateUser();
  }, [instantiateUser]);

  return (
    <>
      <ResponsiveDialog />
      <Snackbar />
      <Router>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                routeRoleRequirement={["allAuthenticated"]}
                component={Home}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
