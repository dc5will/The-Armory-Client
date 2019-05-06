import React from 'react';
import Spot from '../Components/Spot/Spot';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('Spot component', () => {

  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Spot />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})