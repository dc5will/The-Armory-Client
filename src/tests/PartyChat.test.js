import React from 'react';
import PartyChat from '../Components/PartyChat/PartyChat';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('PartyChat component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <PartyChat />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})