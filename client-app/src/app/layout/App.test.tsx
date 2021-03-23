import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "./App";
import ErrorPage from "../../views/error-404-page/error-404-page";
import userEvent from "@testing-library/user-event";

test("test entering bad route", () => {
  const history = createMemoryHistory();
  history.push("/someroute/bad");
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(screen.getByText("404 page not found")).toBeInTheDocument();
});

test("test homepage button in error page", () => {
  render(<ErrorPage />);

  userEvent.click(screen.getByText("Go to Home Page"));
  expect(document.getElementById("homepage")).toBeInTheDocument;
});
