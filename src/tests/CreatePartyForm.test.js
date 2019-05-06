import React from 'react';
import CreatePartyForm from '../Components/CreatePartyForm/CreatePartyForm'
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('CreatePartyForm component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <CreatePartyForm />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})