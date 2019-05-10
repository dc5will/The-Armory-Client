import React from "react";
import ActiveSquad from "../Components/ActiveSquad/ActiveSquad";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

const props = {
  index: 1,
  id: "fb1d3c63-6a72-4013-be82-5b523c1dd1cd",
  game_id: "aa0e8ce9-1a71-42e7-804d-6838556fa6ed",
  title: "Admin",
  owner_id: 1,
  description: "This is a description of this party.",
  require_app: true,
  gamemode: {
    name: "Quick Play",
    icon_url: "Gamemode-Quickplay.png"
  },
  reqs: [
    {
      name: "Silver"
    },
    {
      name: "Bronze"
    }
  ],
  spots: [
    {
      id: "64ed5ba8-78db-44c6-ae60-46e6a2a07ff9",
      filled: {
        username: "admin",
        avatar_url: "https://i.ebayimg.com/images/g/PfAAAOSwA3dYIPRN/s-l300.jpg"
      },
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
    }
  ]
};

describe("Game component", () => {
  // remove unique key warning message
  let savedError;
  beforeEach(() => {
    savedError = console.error;
    console.error = jest.fn();
  })

  afterEach(() => {
    console.error = savedError;
  })

  it("renders without crashing", () => {
    mount(<ActiveSquad party={props} />);
  });

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <ActiveSquad party={props} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
