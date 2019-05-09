import React from "react";
import Dropdown from "../Components/Dropdown/Dropdown";
import { MemoryRouter } from "react-router-dom";
import { shallow } from "enzyme";

describe("Dropdown component", () => {
  it("renders without crashing", () => {
    shallow(
      <MemoryRouter>
        <Dropdown />
      </MemoryRouter>
    );
  });
});
