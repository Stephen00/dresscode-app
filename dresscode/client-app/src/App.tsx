import React, {Component} from "react";

import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Container from "./components/container/container";
import Navbar from "./components/navbar/navbar";

class App extends Component {
  // state = {
  //   articles: [],
  // };

  // componentDidMount() {
  //   axios.get("http://127.0.0.1:8000/discover/articles/").then((response) => {
  //     this.setState({
  //       articles: response.data,
  //     });
  //   });
  // }

  render() {
    return (
      <div>
        <Navbar />
        <Container />
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <ul>
      //       {this.state.articles.map((article: any) => (
      //         <li key={article.pk}>{article.title}</li>
      //       ))}
      //     </ul>
      //   </header>
      // </div>
    );
  }
}

export default App;
