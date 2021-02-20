import React from "react";
import "./discover-card.css";
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import { Card, Col, Row, Button } from "react-bootstrap";
import { formatDistance } from "date-fns";
import { IPost } from "../../app/models/post";
import { Link } from "react-router-dom";
import { IPoll } from "../../app/models/poll";
import DiscoverPoll from "../../features/discover-poll/discover-poll"

type CardProps = {
  post: IPost;
};

const DiscoverCard: React.FC<CardProps> = ({ post }) => {
  if (post.content_type === "polls") {
    var answers = [(post?.content as IPoll).answer1, 
                    (post?.content as IPoll).answer2, 
                    (post?.content as IPoll).answer3,
                    (post?.content as IPoll).answer4]
    var votes = [(post?.content as IPoll).vote1, 
                  (post?.content as IPoll).vote2, 
                  (post?.content as IPoll).vote3,
                  (post?.content as IPoll).vote4]
    
    var new_answers: string[] = []
    var new_votes: number[] = []
    var total_votes: number = 0
  
    answers.forEach(function (value, index) {
      if (answers[index] !== null) {
        new_answers.push(String(answers[index]))
        new_votes.push(Number(votes[index]))
        total_votes += Number(votes[index])
      }
    });

    return (
      <div>
        <Card
          key={post.id}
          className="text-color"
          style={{ textDecoration: "none", color: "#74529e" }}
        >
          <Card.Subtitle className="date-style">
            {formatDistance(post.created_at, new Date())} ago 
          </Card.Subtitle>
          <Card.Title>{post.content.title}</Card.Title>
          <div className="poll-section">
            <DiscoverPoll answers={new_answers} votes={new_votes} total_votes={total_votes}/>
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
      </div>
    )
  }

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
