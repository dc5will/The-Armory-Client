import React from 'react';
import FilterPartiesForm from '../Components/FilterPartiesForm/FilterPartiesForm'
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('FilterPartiesForm component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <FilterPartiesForm />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})