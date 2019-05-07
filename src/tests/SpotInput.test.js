import React from 'react';
import SpotInput from '../Components/CreatePartyForm/SpotInput/SpotInput';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";

describe('SpotInput component', () => {

  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <SpotInput />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })

  it.skip("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <SpotInput />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})