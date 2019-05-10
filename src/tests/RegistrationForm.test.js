import React from "react";
import RegistrationForm from "../Components/RegistrationForm";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow } from 'enzyme';

describe("RegistrationForm component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders registration input with username, email and password', () => {
    const registrationName = 'testUser'
    const testEmail = 'testUser@email.com';
    const testPass = 'Password1234!'
    const wrapper = shallow(<RegistrationForm />);
    wrapper.find('#registration-name-input').simulate('change', {target: {name: 'email-input', value: registrationName}});
    wrapper.find('#registration-email-input').simulate('change', {target: {name: 'email-input', value: testEmail}});
    wrapper.find('#registration-password-input').simulate('change', {target: {name: 'password-input', value: testPass}});
    wrapper.find('.submit-button').simulate('click');
  })

  it('when registration form is submitted the event is cancelled', () => {
    const wrapper = shallow(<RegistrationForm />);
    let prevented = false;
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(prevented).toBe(true);
  })

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <RegistrationForm />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
