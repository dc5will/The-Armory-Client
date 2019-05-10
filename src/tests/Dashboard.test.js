import React from 'react';
import Dashboard from '../Routes/Dashboard';
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from "enzyme";


describe('Dashboard component', () => {

  it('renders without crashing', () => {
    shallow(<Dashboard />)
  })

  it('renders title search filter input', () => {
    const testSearch = 'test';
    const wrapper = shallow(<Dashboard />);
    wrapper.find('#title-search-input').simulate('change', {target: {name: 'search', value: testSearch}});
    wrapper.find('.games-search-button').simulate('click');
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