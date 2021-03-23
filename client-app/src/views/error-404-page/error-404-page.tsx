import React from "react";
import "./error-404-page.css";
import { Button } from "react-bootstrap";
import CatPicture from "../../assets/cat.png";
import { history } from "../../history";

const Error404Page = () => {
  const navigateTo = () => history.push("/latest");

  return (
    <div className="error-page-config">
      <img
        src={CatPicture}
        alt="Cute cat picture"
        className="error-page-image"
      />
      <h1 className="text-config">Page not found</h1>
      <Button className="navigation-button" onClick={navigateTo}>
        <i className="fas fa-home icon-config"></i>Go to the latest posts
      </Button>
    </div>
  );
};

export default Error404Page;
