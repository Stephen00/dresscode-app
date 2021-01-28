import React, { useEffect, Fragment, useContext } from "react";
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import "./discover-article-page.css";
import { Card, Col, Row } from "react-bootstrap";
import ArticleStore from "../../app/stores/articleStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

const DiscoverArticle: React.FC = () => {
  const articleStore = useContext(ArticleStore);
  const {
    articles,
    loadArticles,
    removeAllArticles,
    selectArticle,
    loadingInitial,
  } = articleStore;

  useEffect(() => {
    if (!articles) {
      loadArticles();
    }
    return () => {
      removeAllArticles();
    };
  }, []);

  if (loadingInitial) return <LoadingComponent content="Loading articles..." />;

  return (
    <Fragment>
      {articleStore.articles?.map((article) => (
        <a
          key={article.pk}
          style={{ cursor: "pointer" }}
          onClick={() => selectArticle(article.pk)}
        >
          <Card key={article.pk}>
            <Card.Title className="date-style text-color">
              21/10/2020
            </Card.Title>
            <Card.Title className="text-color">{article.title}</Card.Title>
            <div className="image-section">
              <img src={Picture} className="overview-image" />
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
        </a>
      ))}
    </Fragment>
  );
};

export default observer(DiscoverArticle);
