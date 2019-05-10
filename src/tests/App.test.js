import React from "react";
import App from "../App";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

describe("App component", () => {
  // smoke test
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

// snapshot test
it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
