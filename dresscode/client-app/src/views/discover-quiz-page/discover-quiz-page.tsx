import React from "react";
import './discover-quiz-page.css';
import { Card, Col, Row } from "react-bootstrap";
import ArticleStore from "../../app/stores/articleStore";
import { observer } from "mobx-react-lite";
import { formatDistance } from "date-fns";
import { Link } from 'react-router-dom';

const DiscoverQuizPage = () => {
    return (
        <div>
            <h1>Discover Quiz Page</h1>
            <Link to={'/quiz/'+'java' }>Link to quiz</Link>
        </div>
    )
}

export default DiscoverQuizPage;