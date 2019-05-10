import React from "react";
import Game from "../Components/Game";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

const data = {
  id: "aa0e8ce9-1a71-42e7-804d-6838556fa6ed",
  title: "Test Game",
  image_url:
    "https://res.cloudinary.com/squadarmory/image/upload/v1557172650/overwatch_epjgky.png",
  tags: ["Test tag1", "test tag2"]
};

describe("Game component", () => {
  it("renders without crashing", () => {
    shallow(<Game props={data} />);
  });

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Game props={data}/>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
