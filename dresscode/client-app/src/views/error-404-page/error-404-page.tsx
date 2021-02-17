import React from "react";
import './error-404-page.css';
import { Button } from "react-bootstrap";
import CatPicture from "../../assets/cat.png";
import { useHistory } from "react-router-dom";

const Error404Page = () => {
    const history = useHistory();
    const navigateTo = () => history.push('/latest');

    return (
        <div className="error-page-config">
            <img
                src={CatPicture}
                alt="no picture found"
                className="error-page-image"
                />
            <h1 className="text-config">404 page not found</h1>
            <Button variant="info" onClick={navigateTo}>
                <i className="fas fa-home icon-config"></i>Go to Home Page
            </Button>
        </div>
    )
}

export default Error404Page;