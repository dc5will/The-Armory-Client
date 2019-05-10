//avatar image, username, account preferences, logout
import React, { useContext } from "react";
import config from "../../config";

import GameContext from "../../Contexts/gameContext";

export default function Spot(props) {
  const gameContext = useContext(GameContext);

  function generateRoleImages() {
    const { roles } = props.spot;
    let temp;

    if (roles.length === 1) {
      if (roles[0].icon_url) {
        temp = (
          <img className="squad__spots-full" src={`${config.IMAGES_ENDPOINT}/${props.gameId}/${roles[0].icon_url}`} alt=""/>
        );
      } else {
        temp = (<i className="squad__spots-empty fas fa-users"/>);
      }
    } else if (roles.length > 1) {
      temp = (
        <>
          <img className="squad__spots-first-half" src={`${config.IMAGES_ENDPOINT}/${props.gameId}/${roles[0].icon_url}`} alt=""/>
          <img className="squad__spots-second-half" src={`${config.IMAGES_ENDPOINT}/${props.gameId}/${roles[1].icon_url}`} alt=""/>
        </>
      );
    }

    if (props.spot.filled) {
      return (
        <>
          {temp}
          <i className=" squad__spots-filled fas fa-check"/>
        </>
      );
    } else {
      return temp;
    }
  }
  
  return (
    <li className="squad__spots-image-container">
      {generateRoleImages()}
      {/* {!props.spot.filled && <button type="button" onClick={handleJoinSpot}>Join spot</button>} */}
    </li>
  );
}
