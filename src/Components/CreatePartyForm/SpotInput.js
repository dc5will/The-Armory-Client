import React, { useState } from "react";
import AuthApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";
import './SpotInput.css';

export default function SpotInput(props) {
  return (
    <div className={props.omitted ? 'spot_input spot_omitted' : 'spot_input'}>
      <button type="button" onClick={() => props.toggleOptions(props.index)}>
        {'Show Options' + props.index}
      </button>
      {props.showOptions && <div className="show_input_options">
        <button type="button" onClick={(e) => { props.omitSpot(props.index) }}> Omit </button>
      </div>}
    </div>
  );
}
