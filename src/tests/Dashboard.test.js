import React from 'react';
import Dashboard from '../Routes/Dashboard';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom';

describe('Dashboard component', () => {

  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})