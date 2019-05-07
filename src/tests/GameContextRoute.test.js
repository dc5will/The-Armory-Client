import React from 'react';
import GameContextRoute from '../Routes/GamePage/GameContextRoute';
// import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from 'enzyme';

describe('GameContextRoute component', () => {

  it('renders without crashing', () => {
    shallow(<GameContextRoute />)
    // const div = document.createElement('div');
    // ReactDOM.render(
    //   <MemoryRouter>
    //     <GameContextRoute />
    //   </MemoryRouter>, div
    // );
    // ReactDOM.unmountComponentAtNode(div);
  })

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <GameContextRoute />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})