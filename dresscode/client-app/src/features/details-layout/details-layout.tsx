import React, { useEffect, useContext } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import "./details-layout.css";
import { Col, ListGroup, Row } from "react-bootstrap";
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
    reactToPost,
  } = postStore;

  const onReactionChange = (reaction: string) => {
    reactToPost(selectedPost!!.id, reaction, "details");
  };

  useEffect(() => {
    loadPost(slug, path);
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
          <Col xs={12} md={8}>
            <Row>
              <Col xs={7} md={8} className="author-date">
                <Row>{selectedPost?.author}</Row>
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
        {selectedPost.content_type === "articles" &&
          (selectedPost.content as IArticle).media &&
          (selectedPost.content as IArticle).media?.image && (
            <Row>
              <div className="image-div">
                <img
                  src={`http://localhost:8000${
                    (selectedPost.content as IArticle).media!!.image
                  }`}
                  alt="post"
                  className="article-image"
                />
              </div>
            </Row>
          )}

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

        <Row className="d-md-none">
          <Col xs={6} />
          <Col xs={6}>
            <div className="social-icons">
              <i className="fab fa-facebook fa-2x" />
              <i className="fab fa-twitter fa-2x" />
              <i className="fab fa-linkedin fa-2x" />
            </div>
          </Col>
        </Row>

        <Row className="after-content-row">
          <Col md={2} xs={3} className="icon-style">
            <i
              className="far fa-heart fa-2x"
              onClick={() => onReactionChange("heart")}
            >
              <span>{selectedPost?.reaction1_counter}</span>
            </i>
          </Col>
          <Col md={2} xs={3} className="icon-style">
            <i
              className="far fa-star fa-2x"
              onClick={() => onReactionChange("star")}
            >
              <span>{selectedPost?.reaction2_counter}</span>
            </i>
          </Col>
          <Col md={6} xs={3} />
          <Col md={2} xs={3} className="icon-style">
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
