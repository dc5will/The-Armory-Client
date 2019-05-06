import React from 'react';
import UserProfile from '../Components/UserProfile';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('UserProfile component', () => {

  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})