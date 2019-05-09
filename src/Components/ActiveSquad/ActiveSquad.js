import React, { useState, useContext } from 'react';
import Spot from '../Spot/Spot';
import config from '../../config';
import './ActiveSquad.css';
import TokenService from '../../services/token-service';
import GameContext from '../../Contexts/gameContext';

export default function ActiveSquad(props) {
  const gameContext = useContext(GameContext);
  const [spotToJoin, setSpotToJoin] = useState(undefined);
 
  function generateRoleImages(roles, filled) {
    let temp;
    if (roles.length === 1) {
      if (roles[0].icon_url) {
        temp = (
          <img className="active-squad__spots-full" src={`${config.IMAGES_ENDPOINT}/${gameContext.id}/${roles[0].icon_url}`} alt=""/>
        );
      } else {
        temp = (<i className="squad__spots-empty fas fa-users"/>);
      }
    } else if (roles.length > 1) {
      temp = (
        <>
          <img className="active-squad__spots-first-half" src={`${config.IMAGES_ENDPOINT}/${gameContext.id}/${roles[0].icon_url}`} alt=""/>
          <img className="active-squad__spots-second-half" src={`${config.IMAGES_ENDPOINT}/${gameContext.id}/${roles[1].icon_url}`} alt=""/>
        </>
      );
    }
    if (filled) {
      return (
        <>
          {temp}
          <i className="squad__spots-filled fas fa-check"/>
        </>
      );
    } else {
      return temp;
    } 
  }

  function handleSpotOnClick(index) {
    if (spotToJoin === index) {
      setSpotToJoin(undefined);
    } else {
      setSpotToJoin(index);
    }
  }

  function generateSpots(party) {
    return party.spots
      .map((spot, index) => {
        if (spot.filled) {
          return <li className="active-squad__checkbox-container">
            <div className="active-squad__fake-checkbox">
              {generateRoleImages(spot.roles, spot.filled)}
            </div>
          </li>
        } else {
          return <li 
            className="active-squad__checkbox-container"
          >
            <div
              className={index === spotToJoin ? "active-squad__checkbox active-squad__active-checkbox" : "active-squad__checkbox"} 
              tabIndex="0" 
              aria-label="checkbox"
              onClick={() => handleSpotOnClick(index)}
            >
              {generateRoleImages(spot.roles, spot.filled)}
            </div>
          </li>;
        }
      });
  }

  function generateRequirements() {
    return props.party.reqs.map((req, i) => {
      if (req.name) {
        return <span className="small-detail" key={i}>{req.name}</span>
      }
    });
  }

  function handleJoinSpot(e) {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/spot/${props.party.spots[spotToJoin].id}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ game_id: gameContext.id, party_id: props.party.id })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        } else {
          props.history.push(`/party/${props.party.id}`);
        }
      })
      .catch(err => {
        console.log(err);
        gameContext.setError(err);
      });
  }

  return (
    <div className="active-squad-container">
      <h2 className="modal-header">{props.party.title}</h2>
      <span className="active-squad__section-header">Details</span>
      <div className="active-squad__details">
        <div className="squad__gamemode-image-container">
          {(props.party.gamemode) 
            ? <img className="squad__gamemode-image" src={`${config.IMAGES_ENDPOINT}/${gameContext.id}/${props.party.gamemode.icon_url}`} alt=""/>
            : <i className="squad__gamemode-image fas fa-globe squad__gamemode-image-icon"></i>
          }
        </div>
        <div className="active-squad__details-text-container">
          {props.party.gamemode && <span className="small-detail">{props.party.gamemode.name}</span>}
          {generateRequirements()}
          <p>{props.party.description || 'No description...'}</p>
        </div>
      </div>
      <span className="active-squad__section-header">Owner</span>
      <div className="active-squad__owner">
        <div className="squad__spots-image-container">
          <img className="squad__avatar-image" src={props.party.owner_id.avatar_url} alt=""/>
        </div>
        <p>{props.party.owner_id.username}</p>
      </div>
      <span className="active-squad__section-header">Select a spot...</span>
      <form className="active-squad__spots" onSubmit={handleJoinSpot}>
        <ul className="active-squad__spots-list">
          {generateSpots(props.party)}
        </ul>
        <div className="create-squad__button-container">
          <button className="green-button active-squad__submit-button" type="submit" disabled={!spotToJoin}>Join Squad</button>
          <button className="grey-button active-squad__cancel-button" type="button" aria-label="cancel" onClick={props.hide}>Cancel</button>
        </div>
      </form>
    </div>
  )
}