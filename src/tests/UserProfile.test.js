import React from 'react';
import UserProfile from '../Components/UserProfile';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

describe('UserProfile component', () => {

  it('renders without crashing', () => {
    shallow(<UserProfile/>)
    // const div = document.createElement('div');
    // ReactDOM.render(
    //   <MemoryRouter>
    //     <UserProfile />
    //   </MemoryRouter>, div
    // );
    // ReactDOM.unmountComponentAtNode(div);
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