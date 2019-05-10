import React from 'react';
import SpotInputFieldset from '../Components/CreatePartyForm/SpotInput/SpotInputFieldset';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

describe('SpotInputFieldset component', () => {

  it('renders without crashing', () => {
    shallow(<SpotInputFieldset/>)
  })

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <SpotInputFieldset />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})