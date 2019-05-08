import React from "react";
import Party from "../Components/Party/Party";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

const props = {
  party: {
    id: "fb1d3c63-6a72-4013-be82-5b523c1dd1cd",
    game_id: "aa0e8ce9-1a71-42e7-804d-6838556fa6ed",
    title: "Test Title",
    owner_id: 1,
    description: "This is a description of this testing party.",
    require_app: true,
    gamemode: {
      name: "Quick Play",
      icon_url: ""
    }
  },
  reqs: [
    {
        name: "test reqs 1"
    },
    {
        name: "test reqs 2"
    }
],
spots: [
    {
        id: "64ed5ba8-78db-44c6-ae60-46e6a2a07ff9",
        filled: null,
        roles: [
            {
                name: "test2",
                icon_url: ""
            },
            {
                name: "test2",
                icon_url: ""
            }
        ]
    },
    {
        id: "25539899-aae0-469e-92c1-a2116badc84c",
        filled: {
            "username": "admin",
            "avatar_url": "https://i.ebayimg.com/images/g/PfAAAOSwA3dYIPRN/s-l300.jpg"
        },
        roles: [
            {}
        ]
    }
]
};

describe.skip("Party component", () => {
  console.log(props.party)
  it("renders without crashing", () => {
    shallow(<Party party={props} />);
  });

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Party party={props} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
