import React from 'react';
import LoginForm from '../Components/LoginForm';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from 'enzyme'

describe.only('LoginForm component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders login input with email and password', () => {
    const testEmail = 'testUser';
    const testPass = 'Password1234!'
    const wrapper = shallow(<LoginForm />);
    wrapper.find('#email-input').simulate('change', {target: {name: 'email-input', value: testEmail}});
    wrapper.find('#password-input').simulate('change', {target: {name: 'password-input', value: testPass}});
    wrapper.find('button').simulate('click');
  })

  it('when login form is submitted the event is cancelled', () => {
    const wrapper = shallow(<LoginForm />);
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
          <LoginForm />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})