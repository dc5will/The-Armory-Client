import React from 'react';
import UserProfile from '../Components/UserProfile';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

describe('UserProfile component', () => {
  it('renders without crashing', () => {
    shallow(<UserProfile/>)
  })

  it('when user profile form is submitted the event is cancelled', () => {
    const wrapper = shallow(<UserProfile />);
    let prevented = false;
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(prevented).toBe(true);
  })

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <UserProfile />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})