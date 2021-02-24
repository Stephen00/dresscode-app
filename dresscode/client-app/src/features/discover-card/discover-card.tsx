import React from "react";
import "./discover-card.css";
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import { Card, Col, Row } from "react-bootstrap";
import { formatDistance } from "date-fns";
import { IPost } from "../../app/models/post";
import { IPoll } from "../../app/models/poll";
import DiscoverPoll from "../../features/discover-poll/discover-poll";
import { Link } from "react-router-dom";
import { DiscoverCardProps } from "../../views/commonProps";

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
  return (
    <ConditionalLink
      to={`/${post.content_type}/${post.content.slug}`}
      condition={post.content_type !== "polls"}
    >
      <div>
        <Card key={post.id} className="text-color">
          <Card.Subtitle className="date-style">
            {formatDistance(post.created_at, new Date())} ago
          </Card.Subtitle>
          <Card.Title>{post.content.title}</Card.Title>
          {post.content_type === "polls" ? (
            <div className="poll-section">
              <DiscoverPoll poll={post?.content as IPoll} />
            </div>
          ) : (
            <div className="image-section">
              <img alt="" src={Picture} className="overview-image" />
            </div>
          )}

          <Card.Body>
            <Row>
              <Col xs={4} className="icon-style">
                <i className="far fa-heart fa-2x">
                  <span>{post.reaction1_counter}</span>
                </i>
              </Col>
              <Col xs={4} className="icon-style">
                <i className="far fa-star fa-2x">
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
    </ConditionalLink>
  );
};

export default DiscoverCard;
