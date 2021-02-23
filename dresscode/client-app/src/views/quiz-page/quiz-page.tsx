import './quiz-page.css';
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { IQuiz } from "../../app/models/quiz";
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import { Card, Col, Container, Nav, Row, Image, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';

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
    <Container id='page-container'>
        <Row className="mt-5">
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
        <Row className="align-items-center">
            <Col id='content-col'>
                <Card border="info" className="quiz-card">
                    <Card.Subtitle className="date-style">
                         2 ago
                    </Card.Subtitle>
                    <Card.Title id="question-text">
                        When was C# released?
                    </Card.Title>
                    <Card.Body>
                        <Form>
                            <div className="mb-4 checkHolder">
                              <Form.Check
                                name="groupOptions"
                                type="radio"
                                className="radio-buttons"
                                label={`1993`}
                                />
                              <Form.Check
                                name="groupOptions"
                                type="radio"
                                label={`1994`}
                              />
                              <Form.Check
                                name="groupOptions"
                                type="radio"
                                label={`1990`}
                              />
                              <Form.Check
                                name="groupOptions"
                                type="radio"
                                label={`1983`}
                              />
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    </Container>

    )
}

export default QuizPage;