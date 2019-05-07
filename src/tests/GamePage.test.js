import React from 'react';
import GamePage from '../Routes/GamePage/GamePage';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from 'enzyme';

describe('GamePage component', () => {

  it('renders without crashing', () => {
    shallow(<GamePage />)
    // const div = document.createElement('div');
    // ReactDOM.render(
    //   <MemoryRouter>
    //     <GamePage />
    //   </MemoryRouter>, div
    // );
    // ReactDOM.unmountComponentAtNode(div);
  })

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <GamePage />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})