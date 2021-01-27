import React from "react";
import './discover-card.css';
import Picture from "../../assets/shutterstock_256173265_edit.jpg";
import { Card, Col, Row } from "react-bootstrap";

type CardProps = {
    key: string,
    title: string,
    slug: string,
    date: string,
    reactions?: Array<number>
}

const DiscoverCard = ({ key, title, slug, date = "20/10/2020", reactions = [264, 25, 4]}: CardProps) => {
    return (
        <Card key={key}>
            <Card.Title className="date-style text-color">{date}</Card.Title>
            <Card.Title className="text-color">{title}</Card.Title>
            <div className="image-section">
                <img
                    src={Picture}
                    alt="no picture found"
                    className="overview-image"
                />
            </div>
            <Card.Body>
                <Row>
                    <Col xs={4} className="icon-style">
                        <span className="text-color">
                        <i className="far fa-heart fa-2x">
                            <span>{reactions[0]}</span>
                        </i>
                        </span>
                    </Col>
                    <Col xs={4} className="icon-style">
                        <span className="text-color">
                        <i className="far fa-star fa-2x">
                            <span>{reactions[1]}</span>
                        </i>
                        </span>
                    </Col>
                    <Col xs={4} className="icon-style">
                        <span className="text-color">
                        <i className="far fa-share-square fa-2x">
                            <span>{reactions[2]}</span>
                        </i>
                        </span>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default DiscoverCard;