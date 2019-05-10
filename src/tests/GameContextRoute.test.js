import React from 'react';
import GameContextRoute from '../Routes/GamePage/GameContextRoute';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from 'enzyme';

describe('GameContextRoute component', () => {

  it('renders without crashing', () => {
    shallow(<GameContextRoute />)
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