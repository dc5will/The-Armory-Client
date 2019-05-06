import React from 'react';
import PartyPage from '../Routes/PartyPage';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('PartyPage component', () => {
  // skipped for now
  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <PartyPage />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})