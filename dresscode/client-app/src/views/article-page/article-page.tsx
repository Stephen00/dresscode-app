import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { IArticle } from "../../app/models/article";
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import "./article-page.css";
import { Card, Col, Container, Nav, Row, Image } from "react-bootstrap";

const ArticlePage = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/discover/articles/view_article/", {
        params: { slug: "why-java-is-awesome" },
      })
      .then((response) => {
        setArticles(response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (
    <Container>
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
      <Row>
        <Col>
          <Row>
            <div className="image-div">
              <img
                src={Picture}
                alt="no picture found"
                className="article-image"
              />
            </div>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={2}>
          <div className="icons-div">
            <Row>
              <i className="far fa-heart fa-lg m-1">
                <span>25</span>
              </i>
            </Row>
            <Row>
              <i className="far fa-star fa-lg m-1">
                <span>25</span>
              </i>{" "}
            </Row>
            <Row>
              <i className="far fa-share-square fa-lg m-1">
                <span>5</span>
              </i>{" "}
            </Row>
          </div>
        </Col>
        <Col xs={8}>
          <div className="article-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            tempus elit vel libero pretium, id blandit justo tincidunt. Nulla a
            augue non justo tempus tempor. Donec elit tellus, vehicula
            consectetur eros non, bibendum elementum odio. Donec tellus quam,
            imperdiet at dapibus eu, egestas at diam. Aenean suscipit congue
            vestibulum. Nullam ornare lectus eu ex semper sodales. Cras
            vulputate sed quam pharetra suscipit. Cras feugiat consectetur
            varius. Vivamus rutrum, nunc sed gravida mattis, massa velit ornare
            urna, sed aliquam nibh felis ut ante. Praesent dictum ultricies nunc
            in faucibus. Nunc non orci at enim iaculis cursus. Fusce sed
            ultrices erat. Proin finibus convallis maximus. Quisque sed dui
            bibendum, tincidunt ligula vitae, iaculis massa.
          </div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          tempus elit vel libero pretium, id blandit justo tincidunt. Nulla a
          augue non justo tempus tempor. Donec elit tellus, vehicula consectetur
          eros non, bibendum elementum odio. Donec tellus quam, imperdiet at
          dapibus eu, egestas at diam. Aenean suscipit congue vestibulum. Nullam
          ornare lectus eu ex semper sodales. Cras vulputate sed quam pharetra
          suscipit. Cras feugiat consectetur varius. Vivamus rutrum, nunc sed
          gravida mattis, massa velit ornare urna, sed aliquam nibh felis ut
          ante. Praesent dictum ultricies nunc in faucibus. Nunc non orci at
          enim iaculis cursus. Fusce sed ultrices erat. Proin finibus convallis
          maximus. Quisque sed dui bibendum, tincidunt ligula vitae, iaculis
          massa.
          <div></div>
        </Col>
        <Col xs={2}>
          <div className="tags-div">TAGS: Java</div>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticlePage;
