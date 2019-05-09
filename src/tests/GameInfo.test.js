import React from "react";
import GameInfo from "../Components/GameInfo/GameInfo";
import { shallow } from "enzyme";

describe("GameInfo component", () => {
  it("renders without crashing", () => {
    shallow(<GameInfo />);
  });
});
