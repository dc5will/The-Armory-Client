import React from "react";
import RegistrationForm from "../Components/Registration/RegistrationForm";
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
