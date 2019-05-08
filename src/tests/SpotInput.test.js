import React from "react";
import SpotInput from "../Components/CreatePartyForm/SpotInput/SpotInput";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";


describe.skip("SpotInput component", () => {
  it("renders without crashing", () => {
    shallow(<SpotInput 
      // key={key}
      // index={key}
      // omitted={value.omitted}
      // toggleOmitSpot={toggleOmitSpot}
      // toggleSpotOptionsMenu={toggleSpotOptionsMenu}
      // showOptions={key === spotMenuShown}
      // roles={value.roles}
      // handleSpotSubmit={handleSpotSubmit}
    />);
  });

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <SpotInput />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
