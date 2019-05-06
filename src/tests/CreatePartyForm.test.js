import React from 'react';
import CreatePartyForm from '../Components/CreatePartyForm/CreatePartyForm'
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom';

describe('CreatePartyForm component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <CreatePartyForm />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <CreatePartyForm />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})