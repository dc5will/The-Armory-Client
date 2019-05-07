import React from 'react';
import Spot from '../Components/Spot/Spot';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";

describe('Spot component', () => {

  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Spot />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })

  it.skip("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Spot />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})