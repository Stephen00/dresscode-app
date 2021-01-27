import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./NavBar.css";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect fixed="top" expand="lg">
      <LinkContainer to="/latest">
        <Navbar.Brand>
          <img
            className="logo-style"
            src="/assets/logo.svg"
            alt="dressCode logo"
          />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/latest">
              <Nav.Link>Latest</Nav.Link>
            </LinkContainer>

            <NavDropdown title="Discover" id="basic-nav-dropdown">
              <LinkContainer to="/discover/articles">
                <Nav.Link>Articles</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/discover/quizzes">
                <Nav.Link>Quizzes</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/discover/polls">
                <Nav.Link>Polls</Nav.Link>
              </LinkContainer>
            </NavDropdown>

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
