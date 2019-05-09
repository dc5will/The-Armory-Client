import React from "react";
import Spot from "../Components/Spot/Spot";
import { MemoryRouter } from "react-router-dom";
import { shallow } from "enzyme";

describe("Spot component", () => {
  it("renders without crashing", () => {
    shallow(
      <MemoryRouter>
        <Spot />
      </MemoryRouter>
    );
  });
});
