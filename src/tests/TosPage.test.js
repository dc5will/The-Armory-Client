import React from 'react';
import TosPage from '../Components/TosPage';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('TosPage component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <TosPage />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})