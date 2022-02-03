import React from "react";
import AppDrawer from "src/components/AppBar/AppDrawer/AppDrawer";
import MiniAppBar from "src/components/AppBar/MiniAppBar/MiniAppBar";

const Home: React.FunctionComponent = () => {
  return (
    <>
      <MiniAppBar appDrawer={AppDrawer} component={() => <></>} />
    </>
  );
};

export default Home;
