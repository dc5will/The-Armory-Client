import React from 'react';
import FilterPartiesForm from '../Components/FilterPartiesForm/FilterPartiesForm'
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

describe('FilterPartiesForm component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <FilterPartiesForm />
      </MemoryRouter>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  })

  // it('when filter parties form is submitted the event is cancelled', () => {
  //   const wrapper = shallow(<FilterPartiesForm />);
  //   let prevented = false;
  //   wrapper.find('form').simulate('submit', {
  //     preventDefault: () => {
  //       prevented = true;
  //     }
  //   });
  //   expect(prevented).toBe(true);
  // })

  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <FilterPartiesForm />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})