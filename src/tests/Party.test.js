import React from "react";
import Party from "../Components/Party/Party";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

const props = {
  id: "fb1d3c63-6a72-4013-be82-5b523c1dd1cd",
  game_id: "aa0e8ce9-1a71-42e7-804d-6838556fa6ed",
  title: "Test Title",
  owner_id: 1,
  description: "This is a description of test party.",
  require_app: true,
  gamemode: {
      name: "Quick Play",
      icon_url: "Gamemode-Quickplay.png"
  },
  reqs: [
      {
          name: "Diamond"
      },
      {
          name: "Bronze"
      }
  ],
  spots: [
      {
          id: "64ed5ba8-78db-44c6-ae60-46e6a2a07ff9",
          filled: null,
          roles: [
              {
                  name: "Genji",
                  icon_url: "Icon-Genji.png"
              },
              {
                  name: "Support",
                  icon_url: "Icon-Support.png"
              }
          ]
      },
      {
          id: "25539899-aae0-469e-92c1-a2116badc84c",
          filled: {
              username: "admin",
              avatar_url: "https://i.ebayimg.com/images/g/PfAAAOSwA3dYIPRN/s-l300.jpg"
          },
          roles: [
              {}
          ]
      }
  ]
};

describe("Party component", () => {
  // console.log(props.party)
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
