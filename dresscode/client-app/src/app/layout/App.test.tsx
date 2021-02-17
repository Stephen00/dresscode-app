import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "./App";
import ErrorPage from "../../views/error-404-page/error-404-page";
import HomePage from "../../views/home-page/home-page";
import userEvent from '@testing-library/user-event'

// test("landing on a bad page", () => {
//   const history = createMemoryHistory();
//   history.push("/someroute/bad");
//   render(
//     <Router history={history}>
//       <App />
//     </Router>
//   );

//   expect(screen.getByText("404 page not found")).toBeInTheDocument();
// });

// test("it expands when the button is clicked", () => {
//   render(<ErrorPage/>);

//   userEvent.click(screen.getByText("Go to Home Page"));
//   expect(theThingToBeOpen);
// });

test("renders homepage text", () => {
  render(<ErrorPage />);
  const linkElement = screen.getByText("404 page not found");
  expect(linkElement).toBeInTheDocument();
});
