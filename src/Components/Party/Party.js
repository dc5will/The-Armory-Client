import React from 'react';
import Spot from '../Spot/Spot';

export default function Squad(props) {
  function generateSpots(party) {
    return party.spots
      .map((spot, index) => {
        return (
          <Spot key={index} index={index} spot={spot} gameId={props.gameId} partyId={party.id} history={props.history}/>
        );
      });
  }

  return (
    <div key={props.index}>
    <div className="party-container">
      <p>
        <strong>{props.party.title}</strong>
      </p>
      {(props.party.gamemode) && <><img src={props.party.gamemode.icon_url} alt=""/><p>{props.party.gamemode.mode_name}</p></>}
      {props.party.reqs.map((req, i) => {
        if (req.name) {
          return <p key={i}>{req.name}</p>
        }
      })}
      <p>{props.party.description}</p>
      <div className="avatar-container">
        {/* current dropbox avatar_url doesnt work, but changed to any other url and it works, ex:
        https://i.ebayimg.com/images/g/PfAAAOSwA3dYIPRN/s-l300.jpg*/}
        {generateSpots(props.party)}
      </div>
      <span>{props.party.spots.roles}</span>
    </div>
  </div>
  )
}