import React, { useEffect, useContext, useState } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import "./details-layout.css";
import { Col, Row } from "react-bootstrap";
import { format } from "date-fns";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { DetailsProps } from "../../views/commonProps";
import NoPosts from "../no-posts/no-posts";
import { IArticle } from "../../app/models/article";
import { IQuiz } from "../../app/models/quiz";
import QuizDetails from "../quiz-details/quiz-details";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

import { proxy } from "../../app/api/agent";

const DetailsLayout: React.FC<DetailsProps> = ({ slug, path }) => {
  const postStore = useContext(PostStore);
  const {
    selectedPost,
    loadPost,
    removeSelectedPost,
    loadingInitial,
    reactToPost,
  } = postStore;
  const [isReactedTo, setReactedTo] = useState<boolean>(false);

  const onReactionChange = (reaction: string) => {
    setReactedTo(true);
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
          <Col xs={6} className="author-date">
            <Row>{selectedPost?.author}</Row>
            <Row>{format(selectedPost!!.created_at, "do MMM y")}</Row>
          </Col>
          <Col xs={6}>
            <div className="social-icons">
              <FacebookShareButton
                url={window.location.href}
                quote={"Dresscode - ".concat(selectedPost.content.title)}
                hashtag="#dresscode"
              >
                <i
                  className="fab fa-facebook fa-2x"
                  onClick={() => onReactionChange("share")}
                />
              </FacebookShareButton>
              <TwitterShareButton
                url={window.location.href}
                title={selectedPost.content.title}
              >
                <i
                  className="fab fa-twitter fa-2x"
                  onClick={() => onReactionChange("share")}
                />
              </TwitterShareButton>
              <LinkedinShareButton
                url={window.location.href}
                source={window.location.href}
                title={selectedPost.content.title}
              >
                <i
                  className="fab fa-linkedin fa-2x"
                  onClick={() => onReactionChange("share")}
                />
              </LinkedinShareButton>
            </div>
          </Col>
        </Row>

        {selectedPost.content_type === "quizzes" &&
          (selectedPost.content as IQuiz).media &&
          (selectedPost.content as IQuiz).media?.image && (
            <Row>
              <div className="image-div">
                <img
                  src={`${proxy}${
                    (selectedPost.content as IQuiz).media!!.image
                  }`}
                  alt="post"
                  className="post-image"
                />
              </div>
            </Row>
          )}

        {selectedPost.content_type === "articles" &&
          (selectedPost.content as IArticle).media &&
          (selectedPost.content as IArticle).media?.image && (
            <Row>
              <div className="image-div">
                <img
                  src={`${proxy}${
                    (selectedPost.content as IArticle).media!!.image
                  }`}
                  alt="post"
                  className="post-image"
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

        <Row className="reactions-row">
          <Col md={2} xs={3} className="icon-style">
            <i
              className={`far fa-heart fa-2x ${isReactedTo ? "disabled" : ""}`}
              onClick={() => onReactionChange("heart")}
            >
              <span>{selectedPost?.reaction1_counter}</span>
            </i>
          </Col>
          <Col md={2} xs={3} className="icon-style">
            <i
              className={`far fa-star fa-2x ${isReactedTo ? "disabled" : ""}`}
              onClick={() => onReactionChange("star")}
            >
              <span>{selectedPost?.reaction2_counter}</span>
            </i>
          </Col>
          <Col md={6} xs={3} />
          <Col md={2} xs={3} className="icon-style">
            <i className="far fa-share-square fa-2x disabled">
              <span>{selectedPost?.reaction3_counter}</span>
            </i>
          </Col>
        </Row>

        <Row className="tags-label">Tags:</Row>
        <Row className="d-flex flex-wrap">
          {selectedPost?.content.tags?.map((tag) => (
            <div className="tag" key={tag.tag}>
              {tag.tag}
            </div>
          ))}
        </Row>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default observer(DetailsLayout);
