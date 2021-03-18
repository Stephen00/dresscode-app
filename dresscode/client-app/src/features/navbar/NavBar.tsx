import React, { useContext, useState } from "react";
import { Nav, Navbar, Container, NavDropdown, Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./NavBar.css";
import PostStore from "../../app/stores/postStore";
import { history } from "../../history";
import { observer } from "mobx-react-lite";

const NavBar = () => {
  const postStore = useContext(PostStore);
  const { searchValue, showFilteredResults, setSearchValue } = postStore;

  const getSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pathList = window.location.pathname.split("/")
    if (pathList[1] !== "latest") {
      history.push("/latest");
    }
    setSearchValue(event.target.value);
    showFilteredResults()
  }

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
            <Nav.Item><NavLink className="nav-link" exact to="/latest">Home</NavLink></Nav.Item>
            <NavDropdown  title="Discover" id="basic-nav-dropdown">
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
            <Nav.Item><NavLink className="nav-link" exact to="/people">People</NavLink></Nav.Item>
            <Nav.Item><NavLink className="nav-link" exact to="/more">more</NavLink></Nav.Item>
          </Nav>
          <Form inline>
            <InputGroup >
              <InputGroup.Prepend>
                <InputGroup.Text>
                <i className="fas fa-search"></i></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                value={searchValue}
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

export default observer(NavBar);
