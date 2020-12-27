import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { IArticle } from "../../app/models/article";
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import "./discover-article-page.css";
import { Card, Col, Row } from "react-bootstrap";
import { Grid } from "semantic-ui-react";

const DiscoverArticlePage = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/discover/articles/")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (
    <div>
      {articles.map((article: any) => (
        <Card key={article.pk}>
          <Card.Title
            className="date-style text-color"
            style={{ textAlign: "right" }}
          >
            21/10/2020
          </Card.Title>
          <Card.Title className="text-color">{article.title}</Card.Title>
          <div className="image-section">
            <img
              src={Picture}
              alt="no picture found"
              className="overview-image"
            />
          </div>
          <Card.Body>
            <Row>
              <Col className="icon-style">
                <span className="text-color">
                  <i className="far fa-star fa-2x">
                    <span>25</span>
                  </i>
                </span>
              </Col>
              <Col className="icon-style">
                <span className="text-color">
                  <i className="far fa-star fa-2x">
                    <span>25</span>
                  </i>
                </span>
              </Col>
              <Col className="icon-style">
                <span className="text-color">
                  <i className="far fa-share-square fa-2x">
                    <span>4</span>
                  </i>
                </span>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default DiscoverArticlePage;
