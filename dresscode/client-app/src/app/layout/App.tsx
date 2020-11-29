import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { IArticle } from "../models/article";
import NavBar from "../../features/navbar/NavBar";
import Container from "../../features/container/container";

const App = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/discover/articles/").then((response) => {
      setArticles(response.data);
    });
  }, []);

  return (
    <div>
      <NavBar />
      <Container />
      {/* <ul>
        {articles.map((article: any) => (
          <li key={article.pk}>{article.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;
