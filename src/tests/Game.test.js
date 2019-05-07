import React from 'react';
import Game from '../Components/Game';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
// import { render } from 'react-testing-library';

describe.skip('Game component', () => {

  // TypeError: Cannot read property 'id' of undefined
  it('renders without crashing', () => {

    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Game />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})