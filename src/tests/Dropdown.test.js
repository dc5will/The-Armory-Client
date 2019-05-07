import React from 'react';
import Dropdown from '../Components/Dropdown/Dropdown';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from "enzyme";

describe('Dropdown component', () => {

  it.skip('renders without crashing', () => {
    shallow(<Dropdown/>)
    // const div = document.createElement('div');
    // ReactDOM.render(
    //   <MemoryRouter>
    //     <Dropdown />
    //   </MemoryRouter>, div
    // );
    // ReactDOM.unmountComponentAtNode(div);
  })
})