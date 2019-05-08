import React from 'react';
import Spot from '../Components/Spot/Spot';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

const party = {
  // id: "fb1d3c63-6a72-4013-be82-5b523c1dd1cd",
  // game_id: "aa0e8ce9-1a71-42e7-804d-6838556fa6ed",
  // title: "Admin",
  // owner_id: 1,
  // description: "This is a description of this party.",
  // require_app: true,
  // gamemode: {
  //     name: "Quick Play",
  //     icon_url: ""
  // },
  // reqs: [
  //     {
  //         "name": "Silver"
  //     },
  //     {
  //         "name": "Bronze"
  //     }
  // ],
  spots: [
      {
          id: "64ed5ba8-78db-44c6-ae60-46e6a2a07ff9",
          filled: null,
          roles: [
              {
                  name: "Genji",
              }
          ]
      }
      // {
      //     id: "25539899-aae0-469e-92c1-a2116badc84c",
      //     filled: {
      //         username: "admin",
      //         avatar_url: "https://i.ebayimg.com/images/g/PfAAAOSwA3dYIPRN/s-l300.jpg"
      //     },
      //     roles: [
      //         {}
      //     ]
      // }
  ]
}

describe.skip('Spot component', () => {
    it('renders without crashing', () => {
      console.log(party.roles)
    shallow(<Spot spot={party}/>)
    // const div = document.createElement('div');
    // ReactDOM.render(
    //   <MemoryRouter>
    //     <Spot />
    //   </MemoryRouter>, div
    // );
    // ReactDOM.unmountComponentAtNode(div);
  })

  it.skip("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Spot spot={props}/>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})