import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./SideBar.css";

//This is kept as a reference if we decide to go back to the previous design
const SideBar = () => {
  return (
    <Nav className="sidebar flex-column">
      <LinkContainer to="/discover/articles">
        <Nav.Link>Articles</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/discover/quizzes">
        <Nav.Link>Quizzes</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/discover/polls">
        <Nav.Link>Polls</Nav.Link>
      </LinkContainer>
    </Nav>
  );
};

export default SideBar;
