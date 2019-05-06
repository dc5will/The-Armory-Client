import React from 'react';
import FAQ from '../Components/Faqs/FAQ';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

describe('FAQ component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <FAQ />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })
})