import React from 'react';
import GameInfo from '../Components/GameInfo/GameInfo';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from 'enzyme';

describe('GameInfo component', () => {

  it('renders without crashing', () => {
    shallow(<GameInfo />)
  })

  it.skip("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <GameInfo />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})