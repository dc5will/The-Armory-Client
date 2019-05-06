import React from 'react';
import LoginForm from '../Components/LoginForm';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('LoginForm component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})