import React, { Fragment } from "react";
import "./App.css";
import NavBar from "../../features/navbar/NavBar";
import AppContainer from "../../features/container/container";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Fragment>
      <ToastContainer position="bottom-right" />
      <NavBar />
      <AppContainer />
    </Fragment>
  );
};

export default observer(App);
