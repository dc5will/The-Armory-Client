import React from "react";
import Error from "../Components/Error/Error";
import { MemoryRouter } from "react-router-dom";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

describe.only("Error component", () => {
  const props = {
    error: "Test Error message"
  };

  it("renders without crashing", () => {
    shallow(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );
  });

  it("renders default form", () => {
    const wrapper = shallow(<Error />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the UI as expected", () => {
    const wrapper = shallow(<Error {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
