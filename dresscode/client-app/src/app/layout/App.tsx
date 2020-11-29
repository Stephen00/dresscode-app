import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { IArticle } from "../models/article";
import NavBar from "../../features/navbar/NavBar";

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
      {/* <ul>
        {articles.map((article: any) => (
          <li key={article.pk}>{article.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;
