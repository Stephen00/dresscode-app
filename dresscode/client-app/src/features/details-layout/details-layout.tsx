import React, { useEffect, useContext } from "react";
import PostStore from "../../app/stores/postStore";
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import { observer } from "mobx-react-lite";
import "./details-layout.css";
import { Col, ListGroup, Row, Card, Form } from "react-bootstrap";
import { format } from "date-fns";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { DetailsProps } from "../../views/commonProps";
import NoPosts from "../no-posts/no-posts";
import { IArticle } from "../../app/models/article";
import { IQuiz } from "../../app/models/quiz";
import QuizDetails from "../quiz-details/quiz-details";

const DetailsLayout: React.FC<DetailsProps> = ({ slug, path }) => {
  const postStore = useContext(PostStore);
  const {
    selectedPost,
    loadPost,
    removeSelectedPost,
    loadingInitial,
  } = postStore;

  useEffect(() => {
    if (!selectedPost) {
      loadPost(slug, path);
    }
    return () => {
      removeSelectedPost();
    };
  }, []);

  if (loadingInitial) {
    return <LoadingComponent />;
  }

  if (!selectedPost) {
    return <NoPosts callerType="details" />;
  }

  return (
    <Row className="py-3 text-colour">
      <Col></Col>
      <Col xs={10} md={8}>
        <Row>
          <h5 className="title">{selectedPost?.content.title}</h5>
        </Row>
        <Row className="align-items-end">
          <Col xs={8}>
            <Row className="align-items-end">
              <Col xs={5} md={4}>
                <div className="image-cropper">
                  <img src={Picture} alt="avatar" className="profile-pic" />
                </div>
              </Col>
              <Col xs={7} md={8} className="author-date">
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

        {/* {selectedPost.content_type === "polls" ? (
          <h2>PollCard will be rendered here</h2>
        ) : (
          <Row>
            <div className="image-div">
              <img
                src={Picture}
                alt="no picture found"
                className="article-image"
              />
            </div>
          </Row>
        )} */}

        <Row>
          <div className="image-div">
            <img src={Picture} alt="post" className="article-image" />
          </div>
        </Row>

        {selectedPost.content_type === "articles" && (
          <Row className="post-content">
            <div
              dangerouslySetInnerHTML={{
                __html: (selectedPost.content as IArticle).text,
              }}
            ></div>
          </Row>
        )}

        {selectedPost.content_type === "quizzes" && (
          <Row className="post-content">
            <QuizDetails quiz={selectedPost.content as IQuiz} />
          </Row>
        )}

        <Row className="d-md-none social-icons-row">
          <div className="social-icons">
            <i className="fab fa-facebook fa-2x" />
            <i className="fab fa-twitter fa-2x" />
            <i className="fab fa-linkedin fa-2x" />
          </div>
        </Row>

        <Row className="after-content-row">
          <Col lg={1} xs={4} className="icon-style">
            <i className="far fa-heart fa-2x">
              <span>{selectedPost?.reaction1_counter}</span>
            </i>
          </Col>
          <Col lg={3} xs={4} className="icon-style">
            <i className="far fa-star fa-2x">
              <span>{selectedPost?.reaction2_counter}</span>
            </i>
          </Col>
          <Col lg={7} className="d-none d-lg-block" />
          <Col lg={1} xs={4} className="icon-style">
            <i className="far fa-share-square fa-2x">
              <span>{selectedPost?.reaction3_counter}</span>
            </i>
          </Col>
        </Row>

        <Row className="tags-row after-content-row">
          <span>Tags:</span>
          <ListGroup horizontal>
            {selectedPost?.content.tags?.map((tag) => (
              <ListGroup.Item key={tag.tag}>{tag.tag}</ListGroup.Item>
            ))}
          </ListGroup>
        </Row>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default observer(DetailsLayout);
