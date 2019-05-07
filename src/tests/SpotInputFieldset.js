import React from 'react';
import SpotInputFieldset from '../Components/CreatePartyForm/SpotInput/SpotInputFieldset';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

describe('SpotInputFieldset component', () => {

  it('renders without crashing', () => {
    shallow(<SpotInputFieldset/>)
    // const div = document.createElement('div');
    // ReactDOM.render(
    //   <MemoryRouter>
    //     <SpotInputFieldset />
    //   </MemoryRouter>, div
    // );
    // ReactDOM.unmountComponentAtNode(div);
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