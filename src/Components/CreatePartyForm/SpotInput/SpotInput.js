import React from "react";
import './SpotInput.css';
import SpotInputFieldset from './SpotInputFieldset';

export default function SpotInput(props) {
  return (
    <div className={props.omitted ? 'spot_input spot_omitted' : 'spot_input'}>
      <legend>Spot {props.index}</legend>
      {props.roles[0]}
      {props.roles[1]}
      <button type="button" onClick={() => props.toggleSpotOptionsMenu(props.index)}>
        {'Show Options' + props.index}
      </button>
      {props.showOptions && 
        <SpotInputFieldset
          index={props.index}
          omitted={props.omitted}
          toggleOmitSpot={props.toggleOmitSpot}
          toggleSpotOptionsMenu={props.toggleSpotOptionsMenu}
          roles={props.roles}
          handleSpotSubmit={props.handleSpotSubmit}
        />
      }
    </div>
  );
}
