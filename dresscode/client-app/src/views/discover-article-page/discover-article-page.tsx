import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { IArticle } from "../../app/models/article";
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import "./discover-article-page.css";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

const DiscoverArticlePage = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [visible, setVisible] = React.useState(false)

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
      <Grid columns={1}>
        <Grid.Column>
            <Checkbox
            checked={visible}
            label={{ children: <code>visible</code> }}
            onChange={(e, data: any) => setVisible(data.checked)}
            />
        </Grid.Column>

        <Grid.Column>
            <Sidebar.Pushable as={Segment}>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                width='thin'
            >
                <Menu.Item as='a'>
                  <Icon name='home' />
                  <LinkContainer to="/discover/articles">
                    <Nav.Link>Articles</Nav.Link>
                  </LinkContainer>
                </Menu.Item>
                <Menu.Item as='a'>
                  <Icon name='gamepad' />
                  <LinkContainer to="/discover/quizzes">
                    <Nav.Link>Quizzes</Nav.Link>
                  </LinkContainer>
                </Menu.Item>
                <Menu.Item as='a'>
                  <Icon name='camera' />
                  <LinkContainer to="/discover/polls">
                    <Nav.Link>Polls</Nav.Link>
                  </LinkContainer>
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
            {articles.map((article: any) => (
              <Card key={article.pk}>
                <Card.Title
                  className="date-style text-color"
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
                    <Col xs={4} className="icon-style">
                      <span className="text-color">
                        <i className="far fa-heart fa-2x">
                          <span>25</span>
                        </i>
                      </span>
                    </Col>
                    <Col xs={4} className="icon-style">
                      <span className="text-color">
                        <i className="far fa-star fa-2x">
                          <span>25</span>
                        </i>
                      </span>
                    </Col>
                    <Col xs={4} className="icon-style">
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
            </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Grid.Column>
        </Grid>
        
      {/* <Container>
        <Row>
          <Col xs={12} sm={12} md={2} lg={2}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <LinkContainer to="/discover/articles">
                <Nav.Link>Articles</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/discover/quizzes">
                <Nav.Link>Quizzes</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/discover/polls">
                <Nav.Link>Polls</Nav.Link>
              </LinkContainer>
            </Nav>
          </Col>
          <Col xs={12} sm={12} md={10} lg={10}>
            {articles.map((article: any) => (
              <Card key={article.pk}>
                <Card.Title
                  className="date-style text-color"
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
                    <Col xs={4} className="icon-style">
                      <span className="text-color">
                        <i className="far fa-heart fa-2x">
                          <span>25</span>
                        </i>
                      </span>
                    </Col>
                    <Col xs={4} className="icon-style">
                      <span className="text-color">
                        <i className="far fa-star fa-2x">
                          <span>25</span>
                        </i>
                      </span>
                    </Col>
                    <Col xs={4} className="icon-style">
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
          </Col>
        </Row>
      </Container> */}
    </div>
  );
};

export default DiscoverArticlePage;
