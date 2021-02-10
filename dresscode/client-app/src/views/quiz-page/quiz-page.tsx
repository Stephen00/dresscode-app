import './quiz-page.css';
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { IArticle } from "../../app/models/article";
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import { Card, Col, Container, Nav, Row, Image } from "react-bootstrap";

const QuizPage = () => {

const [quizes, setQuizes] = useState<IQuiz[]>([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/discover/quizzes/<slug:quiz_slug>/", {
        params: { slug: "why-java-is-awesome" },
      })
      .then((response) => {
        setQuizes(response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

    return (
        <Row className=" mt-5">
        <Col xs={3}>
          <Row>
            <div className="profile-image-div">
              <img
                src={Picture}
                alt="no picture found"
                className="profile-image"
              />
            </div>
          </Row>
          <Row>
            <div>
              <span> John Doe</span>
            </div>
          </Row>
          <Row>
            <div> 12/12/2020 </div>
          </Row>
        </Col>
        <Col xs={6}>
          <div>
            <h5 className="title"> Why Java Is Awesome </h5>
          </div>
        </Col>
        <Col xs={3}>
          <div className="social-icons">
            <i className="fab fa-facebook fa-2x" />
            <i className="fab fa-twitter fa-2x" />
            <i className="fab fa-linkedin fa-2x" />
          </div>
        </Col>
      </Row>
    )
}

export default QuizPage;