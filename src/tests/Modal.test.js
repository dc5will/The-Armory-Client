import React from 'react';
import Modal from '../Components/Modal/Modal';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('Modal component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Modal />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})