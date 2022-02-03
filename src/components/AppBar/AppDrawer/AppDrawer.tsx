import { List } from "@material-ui/core";
import React from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "src/utils/hooks";
import { RootState } from "src/store/store";
import AdminAppDrawer from "./AdminAppDrawer";
import ContributorAppDrawer from "./ContributorAppDrawer";
import DeveloperAppDrawer from "./DeveloperAppDrawer";

const AppDrawer: React.FunctionComponent = () => {
  const user: Application.IUserState = useAppSelector(
    (state: RootState) => state.user,
    shallowEqual
  );
  const { currentRole } = user;

  return (
    <>
      {currentRole?.name === "developer" && (
        <div>
          <List>
            <DeveloperAppDrawer />
          </List>
        </div>
      )}
      {currentRole?.name === "contributor" && (
        <div>
          <List>
            <DeveloperAppDrawer />
            <ContributorAppDrawer />
          </List>
        </div>
      )}
      {currentRole?.name === "admin" && (
        <div>
          <List>
            <DeveloperAppDrawer />
            <ContributorAppDrawer />
            <AdminAppDrawer />
          </List>
        </div>
      )}
    </>
  );
};

export default AppDrawer;
