import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "./App";

test("landing on a bad page", () => {
  const history = createMemoryHistory();
  history.push("/someroute/bad");
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(screen.getByText("404 page not found")).toBeInTheDocument();
});
