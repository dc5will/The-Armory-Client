import React from 'react';
import Spot from '../Spot/Spot';
import './Party.css';
import config from '../../config';

export default function Squad(props) {
  function generateSpots(party) {
    return party.spots
      .map((spot, index) => {
        return (
          <Spot key={index} index={index} spot={spot} gameId={props.gameId} partyId={party.id} history={props.history}/>
        );
      });
  }

  function generateRequirements() {
    return props.party.reqs.map((req, i) => {
      if (req.name) {
        return <span className="small-detail" key={i}>{req.name}</span>
      }
    });
  }

  return (
    <li className="squad-container" aria-label='Open Squad Details' tabIndex="0">
      <div className="squad__gamemode-image-container">
        <img className="squad__gamemode-image" src={`${config.IMAGES_ENDPOINT}/${props.gameId}/${props.party.gamemode.icon_url}`} alt=""/>
      </div>
      <div className="squad__details">
        <div className="squad__details-top">
          <h4>{props.party.title}</h4>
          <ul className="squad__spots-list">
            {generateSpots(props.party)}
          </ul>
          <div className="squad__owner">
            <div className="squad__spots-image-container">
              <img className="squad__avatar-image" src={props.party.owner_id.avatar_url} alt=""/>
            </div>
            <p>{props.party.owner_id.username}</p>
          </div>
        </div>
        <p><span className="small-detail">{props.party.gamemode.name}</span>{props.party.description}</p>
      </div>
      <div className="squad__requirements">
        {generateRequirements()}
      </div>
    </li>
  )
}