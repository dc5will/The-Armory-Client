import React from "react";
import SpotInput from "../Components/CreatePartyForm/SpotInput/SpotInput";
import { MemoryRouter } from "react-router-dom";
import { shallow } from "enzyme";

describe("SpotInput component", () => {
  it("renders without crashing", () => {
    shallow(
      <MemoryRouter>
        <SpotInput />
      </MemoryRouter>
    );
  });
});
