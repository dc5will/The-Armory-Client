import React from 'react';
import GamePage from '../Routes/GamePage/GamePage';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from 'enzyme';

describe('GamePage component', () => {

  it('renders without crashing', () => {
    shallow(<GamePage />)
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