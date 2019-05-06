//avatar image, username, account preferences, logout
import React, { useContext } from "react";
import config from "../../config";
import TokenService from '../../services/token-service';
import GameContext from "../../Contexts/gameContext";

export default function Spot(props) {
  const { setError } = useContext(GameContext);

  function handleJoinSpot(e) {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/spot/${props.spot.id}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ game_id: props.gameId, party_id: props.partyId })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        } else {
          props.history.push(`/party/${props.partyId}`);
        }
      })
      .catch(err => {
        setError(err);
      });
  }
  
  return (
    <div>
      <p>Squad Member {props.index} - {`${!!props.spot.filled}`}</p>
      {props.spot.roles.map((role, i) => {
        return <p key={i}>{role.name}</p>
      })}
      {!props.spot.filled && <button type="button" onClick={handleJoinSpot}>Join spot</button>}
    </div>
  );
}
