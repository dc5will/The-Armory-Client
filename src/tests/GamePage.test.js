import React from 'react';
import GamePage from '../Routes/GamePage/GamePage';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('GamePage component', () => {

  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})