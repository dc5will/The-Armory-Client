import React from "react";
import Game from "../Components/Game";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
// import { render } from 'react-testing-library';

const data = {
  id: "aa0e8ce9-1a71-42e7-804d-6838556fa6ed",
  title: "Overwatch",
  image_url:
    "https://res.cloudinary.com/squadarmory/image/upload/v1557172650/overwatch_epjgky.png",
  tags: ["Shooter", "FPS"]
};

describe("Game component", () => {
  // TypeError: Cannot read property 'id' of undefined
  it("renders without crashing", () => {
    console.log(data.id);
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
