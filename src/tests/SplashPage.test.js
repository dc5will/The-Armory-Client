import React from 'react';
import SplashPage from '../Components/Faqs/FAQ';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";

describe('SplashPage component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <SplashPage />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <SplashPage />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})