import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PartyContext from '../../Contexts/partyContext';
import TokenService from '../../services/token-service';

export default function RejoinSquadButton() {

  const partyContext = useContext(PartyContext);
  const partyId = partyContext.party.id;

  function generateButton() {
      return(
      <button>Go to party</button>
      )
  }

  console.log('', TokenService.parseJwt(TokenService.getAuthToken()));
  return <Link to={`/party/${partyId}`}>{generateButton()}</Link>;
}
