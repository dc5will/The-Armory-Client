import React from 'react';
import NotFound from '../Routes/NotFound';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('NotFound component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})