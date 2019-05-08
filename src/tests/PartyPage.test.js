import React from 'react';
import PartyPage from '../Routes/PartyPage';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from 'enzyme';

describe('PartyPage component', () => {
  shallow(<PartyPage />)

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <PartyPage />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})