import React from "react";
import { Col, Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./NavBar.css";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect fixed="top" expand="lg">
      <LinkContainer to="/latest">
        <Navbar.Brand>
          <img src="/assets/logo.svg" alt="dressCode logo" />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/latest">
              <Nav.Link>Latest</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/discover/articles">
              <Nav.Link>Discover</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/people">
              <Nav.Link>People</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/more">
              <Nav.Link as={Link} to="/more">
                More
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
