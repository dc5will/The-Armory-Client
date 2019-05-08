import React, { useContext, useState } from "react";
import './SpotInput.css';
import config from '../../../config';
import GameContext from "../../../Contexts/gameContext";

export default function SpotInput(props) {
  const { roles, id } = useContext(GameContext);
  const [showRoles, toggleShowRoles] = useState(false);

  function generateRoleImages() {
    const spotRoles = props.roles;
    let temp;

    if (spotRoles.length <= 1) {
      if (spotRoles[0] && roles[spotRoles[0]].icon_url) {
        temp = (
          <img className="spot-input__spot-full" src={`${config.IMAGES_ENDPOINT}/${id}/${roles[spotRoles[0]].icon_url}`} alt=""/>
        );
      } else {
        temp = (<i className="spot-input__spot-empty fas fa-users"/>);
      }
    } else if (spotRoles.length > 1) {
      temp = (
        <>
          <img className="spot-input__spot-first-half" src={`${config.IMAGES_ENDPOINT}/${id}/${roles[spotRoles[0]].icon_url}`} alt=""/>
          <img className="spot-input__spot-second-half" src={`${config.IMAGES_ENDPOINT}/${id}/${roles[spotRoles[1]].icon_url}`} alt=""/>
        </>
      );
    }
    return temp;
  }

  function generateRoleText() {
    const spotRoles = props.roles;
    if (props.omitted) {
      return 'Omitted';
    } else if (spotRoles.length > 0) {
      let temp = '';
      temp += roles[spotRoles[0]].name;
      spotRoles[1] && (temp += ' / ' + roles[spotRoles[1]].name);
      return temp;
    } else {
      return 'Open';
    }
  }

  function handleMouseEnter(e) {
    toggleShowRoles(true);
  }

  function handleMouseLeave(e) {
    toggleShowRoles(false);
  }

  return (
    <li 
      className="spot-input spot-input__image-container"
      aria-label="spot button" tabIndex="0" 
      onClick={() => props.toggleSpotOptionsMenu(props.index)}
      onMouseEnter={(e) => handleMouseEnter()}
      onMouseLeave={(e) => handleMouseLeave()}
    >
      {generateRoleImages()}
      {props.omitted && <i className="spot-input__spots-omitted fas fa-times"/>}
      {showRoles && <span className="spot-input__roles-text">{generateRoleText()}</span>}
    </li>
  );
}
