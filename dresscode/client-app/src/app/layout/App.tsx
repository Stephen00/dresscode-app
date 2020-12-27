import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import axios from "axios";
import { IArticle } from "../models/article";
import NavBar from "../../features/navbar/NavBar";
import AppContainer from "../../features/container/container";

const App = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/discover/articles/").then((response) => {
      setArticles(response.data);
    });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <AppContainer />
    </Fragment>
  );
};

export default App;
