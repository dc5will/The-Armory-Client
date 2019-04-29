//avatar image, username, account preferences, logout
import React from "react";
import config from "../../config";
import TokenService from '../../services/token-service';

export default function Spot(props) {
  function handleJoinSpot(e) {
    e.preventDefault();
    console.log(props.spot);
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
        //UPDATE TO DISPLAY ERROR
        console.error(err);
      });
  }
  
  return (
    <div>
      <img
        src={
          (props.spot.filled)
          ? props.spot.filled.avatar_url
          : "https://banner2.kisspng.com/20180503/lge/kisspng-batman-computer-icons-bane-avatar-5aebcc92207686.890462141525402770133.jpg"
        }
        className='avatar_url'
        alt="avatar_icon"
        width="60"
      />
      {!props.spot.filled && <button type="button" onClick={handleJoinSpot}>Join spot</button>}
    </div>
  );
}
