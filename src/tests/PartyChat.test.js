import React from 'react';
import PartyChat from '../Components/PartyChat/PartyChat';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { mount } from 'enzyme';

describe('PartyChat component', () => {
  const wrapper = mount(<PartyChat />)

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <PartyChat />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders chat input for chat form', () => {
    expect(wrapper.find(".chat-input")).toBeDefined();
  })

  it('renders chat submit button on form', () => {
    expect(wrapper.find(".chat-submit-button")).toBeDefined();
  })


  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <PartyChat />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})