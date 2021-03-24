import React, { useContext, useState } from "react";
import "./discover-card.css";
import { Card, Col, Row } from "react-bootstrap";
import { FacebookShareButton } from "react-share";
import { formatDistance } from "date-fns";
import { IPoll } from "../../app/models/poll";
import DiscoverPoll from "../../features/discover-poll/discover-poll";
import { Link } from "react-router-dom";
import { DiscoverCardProps } from "../../views/commonProps";
import { IArticle } from "../../app/models/article";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import { IQuiz } from "../../app/models/quiz";
import { proxy } from "../../app/api/agent";

type ConditionalLinkProps = {
  children: any;
  to: string;
  condition: boolean;
};

var base_link = window.location.host;

const ConditionalLink = ({ children, to, condition }: ConditionalLinkProps) =>
  !!condition && to ? (
    <Link
      to={to}
      className="text-color"
      style={{ textDecoration: "none", color: "#74529e" }}
    >
      {children}
    </Link>
  ) : (
    <>{children}</>
  );

const DiscoverCard: React.FC<DiscoverCardProps> = ({ post }) => {
  const postStore = useContext(PostStore);
  const { reactToPost } = postStore;
  const [isReactedTo, setReactedTo] = useState<boolean>(false);

  const onReactionChange = (reaction: string) => {
    if (reaction !== "share") {
      setReactedTo(true);
    }
    reactToPost(post.id, reaction, "discover");
  };

  return (
    <div>
      <Card key={post.id} className="text-color">
        <Card.Subtitle className="date-style">
          {formatDistance(post.created_at, new Date())} ago
        </Card.Subtitle>
        <ConditionalLink
          to={`/${post.content_type}/${post.content.slug}`}
          condition={post.content_type !== "polls"}
        >
          <Card.Title>{post.content.title}</Card.Title>
          {post.content_type === "polls" && (
            <div className="poll-section">
              <DiscoverPoll poll={post?.content as IPoll} />
            </div>
          )}

          {post.content_type === "articles" &&
            (post.content as IArticle).media &&
            (post.content as IArticle).media?.image && (
              <div className="image-section">
                <img
                  alt=""
                  src={`${proxy}${
                    (post.content as IArticle).media!!.image
                  }`}
                  className="overview-image"
                />
              </div>
            )}

          {post.content_type === "quizzes" &&
            (post.content as IQuiz).media &&
            (post.content as IQuiz).media?.image && (
              <div className="image-section">
                <img
                  alt=""
                  src={`${proxy}${
                    (post.content as IQuiz).media!!.image
                  }`}
                  className="overview-image"
                />
              </div>
            )}
        </ConditionalLink>

        <Card.Body>
          <Row>
            <Col xs={4} className="icon-style">
              <i
                className={`far fa-heart fa-2x ${
                  isReactedTo ? "disabled" : ""
                }`}
                onClick={() => onReactionChange("heart")}
              >
                <span>{post.reaction1_counter}</span>
              </i>
            </Col>
            <Col xs={4} className="icon-style">
              <i
                className={`far fa-star fa-2x ${isReactedTo ? "disabled" : ""}`}
                onClick={() => onReactionChange("star")}
              >
                <span>{post.reaction2_counter}</span>
              </i>
            </Col>

            {post.content_type !== "polls" ? (
              <Col xs={4} className="icon-style">
                <FacebookShareButton
                  url={`${base_link}/${post.content_type}/${post.content.slug}`}
                  quote={"Dresscode - ".concat(post.content.title)}
                  hashtag="#dresscode"
                  className={"socialMediaButton"}
                >
                  <i
                    className="far fa-share-square fa-2x"
                    onClick={() => onReactionChange("share")}
                  >
                    <span>{post.reaction3_counter}</span>
                  </i>
                </FacebookShareButton>
              </Col>
            ) : (
              <Col xs={4} className="icon-style" />
            )}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default observer(DiscoverCard);
