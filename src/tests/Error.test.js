import React from 'react';
import Error from '../Components/Error/Error';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('FAQ component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Error />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})