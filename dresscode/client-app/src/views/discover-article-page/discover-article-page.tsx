import React, { useEffect, Fragment, useContext } from "react";
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import "./discover-article-page.css";
import { Card, Col, Row } from "react-bootstrap";
import ArticleStore from "../../app/stores/articleStore";
import { observer } from "mobx-react-lite";
import { formatDistance } from "date-fns";
import { Link } from 'react-router-dom';

const DiscoverArticle: React.FC = () => {
  const articleStore = useContext(ArticleStore);
  const {
    articles,
    loadArticles,
    removeAllArticles,
    selectArticle,
  } = articleStore;

  useEffect(() => {
    if (!articles) {
      loadArticles();
    }
    return () => {
      removeAllArticles();
    };
  }, []);

  return (
    <Fragment>
      {articleStore.articles?.map((article) => (
        <a
          key={article.id}
          style={{ cursor: "pointer" }}
          onClick={() => selectArticle(article.id)}
        >
          <Card key={article.id} className="text-color">
            <Card.Subtitle className="date-style">
              {formatDistance(article.created_at, new Date())} ago
            </Card.Subtitle>
            <Card.Title><Link to={'/article/'+article.content.slug }>{article.content.title}</Link></Card.Title>
            <div className="image-section">
              <img alt="" src={Picture} className="overview-image" />
            </div>
            <Card.Body>
              <Row>
                <Col xs={4} className="icon-style">
                  <i className="far fa-heart fa-2x">
                    <span>{article.reaction1_counter}</span>
                  </i>
                </Col>
                <Col xs={4} className="icon-style">
                  <i className="far fa-star fa-2x">
                    <span>{article.reaction2_counter}</span>
                  </i>
                </Col>
                <Col xs={4} className="icon-style">
                  <i className="far fa-share-square fa-2x">
                    <span>{article.reaction3_counter}</span>
                  </i>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </a>
      ))}
    </Fragment>
  );
};

export default observer(DiscoverArticle);
