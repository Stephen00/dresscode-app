import React, { useEffect, useContext } from "react";
import PostStore from "../../app/stores/postStore";
import { RouteComponentProps } from "react-router-dom";
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import { observer } from "mobx-react-lite";
import "./article-page.css";
import { Col, Row } from "react-bootstrap";
import { format } from "date-fns";
import { IArticle } from "../../app/models/article";
import LoadingComponent from "../../app/layout/LoadingComponent";

interface DetailsProps {
  slug: string;
  path: string;
}

const ArticlePage: React.FC<RouteComponentProps<DetailsProps>> = ({
  match,
  history,
}) => {
  const postStore = useContext(PostStore);
  const {
    selectedPost,
    loadPost,
    removeSelectedPost,
    loadingInitial,
  } = postStore;

  useEffect(() => {
    if (!selectedPost) {
      loadPost(match.params.slug, match.path);
    }
    return () => {
      removeSelectedPost();
    };
  }, []);

  if (loadingInitial) {
    return <LoadingComponent />;
  }

  if (!selectedPost) {
    return <h2 className="notfound">Article not found</h2>;
  }

  return (
    <Row className="py-3">
      <Col></Col>
      <Col xs={10} md={8}>
        <Row>
          <h5 className="title">{selectedPost?.content.title}</h5>
        </Row>
        <Row>
          <Col xs={8}>
            <Row>
              <Col xs={5} md={4}>
                <div className="image-cropper">
                  <img src={Picture} alt="avatar" className="profile-pic" />
                </div>
              </Col>
              <Col xs={7} md={8}>
                {/* <Row>{selectedPost?.author}</Row> */}
                <Row>John Doe</Row>
                <Row>{format(selectedPost!!.created_at, "do MMM y")}</Row>
              </Col>
            </Row>
          </Col>
          <Col md={4} className="d-none d-md-block">
            <div className="social-icons">
              <i className="fab fa-facebook fa-2x" />
              <i className="fab fa-twitter fa-2x" />
              <i className="fab fa-linkedin fa-2x" />
            </div>
          </Col>
        </Row>
        <Row>
          <div className="image-div">
            <img
              src={Picture}
              alt="no picture found"
              className="article-image"
            />
          </div>
        </Row>
        <Row className="article-content">
          {(selectedPost?.content as IArticle).text}
        </Row>
        {/* <Row>
          <Col xs={4} className="icon-style">
            <i className="far fa-heart fa-2x">
              <span>{selectedPost?.reaction1_counter}</span>
            </i>
          </Col>
          <Col xs={4} className="icon-style">
            <i className="far fa-star fa-2x">
              <span>{selectedPost?.reaction2_counter}</span>
            </i>
          </Col>
          <Col xs={4} className="icon-style">
            <i className="far fa-share-square fa-2x">
              <span>{selectedPost?.reaction3_counter}</span>
            </i>
          </Col>
        </Row> */}
      </Col>
      <Col></Col>
    </Row>
  );
};

export default observer(ArticlePage);
