import React, { useState, useEffect } from "react";
import axios from "axios";
import { IArticle } from "../../app/models/article";
import Picture from "../../assets/shutterstock_256173265_edit.jpg"
import './article-page.css';
import { Button, Card, Col, Row } from 'react-bootstrap';

const ArticlePage = () => {
    const [articles, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/discover/articles/")
                .then((response) => {
                    setArticles(response.data);
                })
                .catch((Error) => {
                    console.log(Error);
                });
    }, []);

    return (
        <div>
            <div className="container">
                {articles.map((article: any) => (  
                    <Card key={article.pk}>
                        <Card.Title className="date-style text-color" style={{textAlign: "right"}}>21/10/2020</Card.Title>
                        <Card.Title className="text-color">{article.title}</Card.Title>
                        <div className="image-section">
                            <img src={Picture} alt="no picture found" />
                        </div>
                        <Card.Body>
                            <Row>
                                <Col className="icon-style">
                                    <span className="text-color">
                                        <i className="far fa-star fa-2x">
                                            <span>25</span>
                                        </i>
                                    </span>
                                </Col>
                                <Col className="icon-style">
                                    <span className="text-color">
                                        <i className="far fa-star fa-2x">
                                            <span>25</span>
                                        </i>
                                    </span>
                                </Col>
                                <Col className="icon-style">
                                    <span className="text-color">
                                        <i className="far fa-share-square fa-2x">
                                            <span>4</span>
                                        </i>
                                    </span>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default ArticlePage;