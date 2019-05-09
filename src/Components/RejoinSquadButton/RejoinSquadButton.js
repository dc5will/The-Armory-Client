import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PartyContext from '../../Contexts/partyContext';
import TokenService from '../../services/token-service';

export default function RejoinSquadButton() {

  const partyContext = useContext(PartyContext);
  const partyId = partyContext.party.id;
  const { sub } = TokenService.parseJwt(TokenService.getAuthToken());
  const spots = partyContext.party.spots;

  function generateButton() {
      return(
      (checkSpots(sub) ? <button>Go to party</button> : '')
      )
  }
  function checkSpots(sub){
    if(spots){
      for(let i = 0; i < spots.length; i++){
        if(spots[i].filled && spots[i].filled.username === sub){
          return true;
        }
      }
      return false;
    }

  }
  return <Link to={`/party/${partyId}`}>{generateButton()}</Link>;
}
