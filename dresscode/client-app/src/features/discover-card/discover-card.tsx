import React from "react";
import "./discover-card.css";
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import { Card, Col, Row } from "react-bootstrap";
import { formatDistance } from "date-fns";
import { IPost } from "../../app/models/post";
import { Link } from "react-router-dom";

type CardProps = {
  post: IPost;
};

const DiscoverCard: React.FC<CardProps> = ({ post }) => {
  return (
    <Card
      key={post.id}
      className="text-color"
      style={{ textDecoration: "none", color: "#74529e" }}
      as={Link}
      to={`/${post.content_type}/${post.content.slug}`}
    >
      <Card.Subtitle className="date-style">
        {formatDistance(post.created_at, new Date())} ago
      </Card.Subtitle>
      <Card.Title>{post.content.title}</Card.Title>
      <div className="image-section">
        <img alt="" src={Picture} className="overview-image" />
      </div>
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
  );
};

export default DiscoverCard;
