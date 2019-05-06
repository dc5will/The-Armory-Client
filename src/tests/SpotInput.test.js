import React from 'react';
import SpotInput from '../Components/CreatePartyForm/SpotInput/SpotInput';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

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
})