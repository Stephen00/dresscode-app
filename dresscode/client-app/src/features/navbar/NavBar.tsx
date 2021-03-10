import React, { useContext } from "react";
import { Nav, Navbar, Container, NavDropdown, Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./NavBar.css";
import PostStore from "../../app/stores/postStore";
import { history } from "../../history";

const NavBar = () => {
  const postStore = useContext(PostStore);

  const getSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pathList = window.location.pathname.split("/")
    if (pathList[1] !== "latest") {
      history.push("/latest");
    }
    postStore.getSearchValue(event.target.value)
  }
  // check bootstrap navbar logic ?

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
          <Form inline>
            <InputGroup >
              <InputGroup.Prepend>
                <InputGroup.Text>
                <i className="fas fa-search"></i></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="nav-search-input"
                className="search-input-section"
                placeholder="search ..."
                onChange={getSearch}
              />
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
