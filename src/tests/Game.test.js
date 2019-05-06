import React from 'react';
import Game from '../Components/Game';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('Game component', () => {

  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})