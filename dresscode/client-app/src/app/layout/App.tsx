import React, { Fragment } from "react";
import "./App.css";
import NavBar from "../../features/navbar/NavBar";
import AppContainer from "../../features/container/container";
import { observer } from "mobx-react-lite";

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <AppContainer />
    </Fragment>
  );
};

export default observer(App);
