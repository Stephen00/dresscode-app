import React from "react";
import { Col, Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <Navbar fixed="top" expand="lg">
      <Navbar.Brand href="#home">
        <img src="/assets/logo.svg" alt="dressCode logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Latest
            </Nav.Link>
            <Nav.Link as={Link} to="/discover/articles">
              Discover
            </Nav.Link>
            <Nav.Link as={Link} to="/people">
              People
            </Nav.Link>
            <Nav.Link as={Link} to="/more">
              More
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    // <Navbar fixed="top" collapseOnSelect expand="lg">
    // <Col lg={4} xs={9}>
    //   <Navbar.Brand as={Link} to="/">
    //     <img src="/assets/logo.svg" alt="dressCode logo" />
    //   </Navbar.Brand>
    // </Col>
    // <Col lg={8} xs={3}>
    //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //   <Navbar.Collapse id="responsive-navbar-nav">
    //     <Nav>
    //       <Nav.Link as={Link} to="/">
    //         Latest
    //       </Nav.Link>
    //       <Nav.Link as={Link} to="/discover/articles">
    //         Discover
    //       </Nav.Link>
    //       <Nav.Link as={Link} to="/">
    //         People
    //       </Nav.Link>
    //       <Nav.Link as={Link} to="/">
    //         More
    //       </Nav.Link>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Col>
    // </Navbar>
  );
};

export default NavBar;
