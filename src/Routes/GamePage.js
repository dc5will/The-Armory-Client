import React, { useState, useEffect, useContext } from "react";
import CreatePartyForm from "../Components/CreatePartyForm/CreatePartyForm";
import config from "../config";
import TokenService from "../services/token-service";
import GameContext from '../Contexts/gameContext';
import Spot from '../Components/Spot/Spot';

import io from 'socket.io-client';
let socket;

export default function GamePage(props) {
  const context = useContext(GameContext);
  const [parties, setParties] = useState([]);
  const [gameInfo, setGame] = useState([]);
  const [showCPF, toggleCPF] = useState(false);

  // Link from dashboard to Overwatch
  // http://localhost:3000/games/aa0e8ce9-1a71-42e7-804d-6838556fa6ed
  // Link from dashboard to FF
  // http://localhost:3000/games/1c0aa6f7-0e03-4ceb-82de-ac53617f1b30

  function getAllParties() {
    return fetch(`${config.API_ENDPOINT}${props.match.url}/parties`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(TokenService.getAuthToken)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(parties => {
        setParties(parties);
      });
  }

  function getGame() {
    return fetch(`${config.API_ENDPOINT}${props.match.url}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(TokenService.getAuthToken)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(game => {
        context.setGame(game);
      });
  }

  useEffect(() => {
    // populate party listing from API
    getAllParties();
    // get game stuff
    getGame();
    // connect to socket io for this game
    socket = io('http://localhost:8000');
    socket.emit('join room', props.match.url);

    socket.on('update parties', function() { 
      getAllParties();
    });

    return () => {
      socket.emit('leave game');
      socket.disconnect();
    };
  }, []);

  function generateSpots(party) {
    return party.spots.map((spot, index) => {
      return (
        <Spot key={index} spot={spot} gameId={props.match.params.gameId} partyId={party.id} history={props.history}/>
      );
    });
  }

  function generateParties() {
    return parties.map((party, index) => (
      <div key={index}>
        <div className="party-container">
          <p>
            <strong>{party.title}</strong>
          </p>
          <p>{party.description}</p>
          <div className="avatar-container">
            {/* current dropbox avatar_url doesnt work, but changed to any other url and it works, ex:
            https://i.ebayimg.com/images/g/PfAAAOSwA3dYIPRN/s-l300.jpg*/}
            {generateSpots(party)}
          </div>
          <span>{party.spots.roles}</span>
        </div>
      </div>
    ));
  }

  function toggleCreatePartyForm(e) {
    e.preventDefault();
    toggleCPF(!showCPF);
  }

  return (
    <div className="container">
      <div className="party-list">
        <img src={context.game.image_url} alt="game-logo" width="40" />
        <h2>{gameInfo.title}</h2>
        <h3>Current Active Parties</h3>
        <div className="parties-list">{generateParties()}</div>
      </div>
      <button type="button" onClick={toggleCreatePartyForm}>Create Party</button>
      {showCPF && <CreatePartyForm socket={socket} roomUrl={props.match.url} history={props.history}/>}
    </div>
  );
}
