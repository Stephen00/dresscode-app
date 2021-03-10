import React, { useContext } from "react";
import "./discover-card.css";
import { Card, Col, Row } from "react-bootstrap";
import { formatDistance } from "date-fns";
import { IPoll } from "../../app/models/poll";
import DiscoverPoll from "../../features/discover-poll/discover-poll";
import { Link } from "react-router-dom";
import { DiscoverCardProps } from "../../views/commonProps";
import { IArticle } from "../../app/models/article";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";

type ConditionalLinkProps = {
  children: any;
  to: string;
  condition: boolean;
};

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

  const onReactionChange = (reaction: string) => {
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
                  src={`http://localhost:8000${
                    (post.content as IArticle).media!!.image
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
                className="far fa-heart fa-2x"
                onClick={() => onReactionChange("heart")}
              >
                <span>{post.reaction1_counter}</span>
              </i>
            </Col>
            <Col xs={4} className="icon-style">
              <i
                className="far fa-star fa-2x"
                onClick={() => onReactionChange("star")}
              >
                <span>{post.reaction2_counter}</span>
              </i>
            </Col>
            <Col xs={4} className="icon-style">
              <i className="far fa-share-square fa-2x">
                <span>{post.reaction3_counter}</span>
              </i>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default observer(DiscoverCard);
