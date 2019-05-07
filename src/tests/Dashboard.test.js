import React from 'react';
import Dashboard from '../Routes/Dashboard';
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom';
import { shallow } from "enzyme";


describe('Dashboard component', () => {

  it('renders without crashing', () => {
    shallow(<Dashboard />)
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