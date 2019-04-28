import React, { useEffect, useContext, useState } from "react";
import TokenService from "../services/token-service";
import config from "../config";
import PartyContext from "../Contexts/partyContext";
import GameContext from "../Contexts/gameContext";

export default function PartyPage() {
  const partyContext = useContext(PartyContext);
  const gameContext = useContext(GameContext);

  function getPartyById(props) {
    return fetch(
      `${config.API_ENDPOINT}/parties/fb1d3c63-6a72-4013-be82-5b523c1dd1cd`,
      {
        headers: {
          authorization: `Bearer ${TokenService.getAuthToken()}`
        }
      }
    ).then(res => (!res.ok ? TokenService.clearAuthToken() : res.json()));
  }

  useEffect(() => {
    getPartyById().then(res => partyContext.setParty(res));
  }, []);

  const party = partyContext.party;
  console.log(party.reqs);

  function generateReqs(reqs) {
    console.log(reqs);
    return reqs.map(req => {
      return <li>{req.req_name}</li>;
    });
  }

  function generateRoles(party) {
    return party.roles.map(role => <li>{role.role_name}</li>);
  }

  function generateDisplayParty(party) {
    return (
      <div>
        <h1>{party.title}</h1>
        <p>{party.description}</p>
        <ul>{generateRoles(party)}</ul>
      </div>
    );
  }
  console.log(gameContext);
  return <>{generateDisplayParty(party)}</>;
}
