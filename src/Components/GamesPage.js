import React, { useState, useEffect } from "react";
import CreatePartyForm from "./CreatePartyForm";
import config from "../config";
import TokenService from "../services/token-service";

export default function PartiesPage(props) {
  const [parties, setParties] = useState([]);
  const [gameInfo, setGame] = useState([]);

  // Link from dashboard to Overwatch
  // http://localhost:3000/games/aa0e8ce9-1a71-42e7-804d-6838556fa6ed/parties
  // Link from dashboard to FF
  // http://localhost:3000/games/1c0aa6f7-0e03-4ceb-82de-ac53617f1b30/parties

  function getAllParties() {
    return fetch(`${config.API_ENDPOINT}${props.match.url}/parties`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(TokenService.getAuthToken)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }

  function getGame() {
    return fetch(`${config.API_ENDPOINT}${props.match.url}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(TokenService.getAuthToken)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }

  useEffect(() => {
    // populate party listing from API
    getAllParties().then(parties => {
      let partyListing = [];
      parties.forEach(party => {
        partyListing.push(party);
      });
      setParties(partyListing);
    });
  }, []);

  useEffect(() => {
    // get game stuff
    getGame().then(games => {
      let gameInfo = {};
      gameInfo = games;
      setGame(gameInfo);
    });
  }, []);

  function generateSpots(party) {
    console.log(party);
    return party.spots.map((spot, index) => {
      return (
        <div key={index}>
          <img
            src={
              (spot.filled)
              ? spot.filled.avatar_url
              : "https://banner2.kisspng.com/20180503/lge/kisspng-batman-computer-icons-bane-avatar-5aebcc92207686.890462141525402770133.jpg"
            }
            className='avatar_url'
            alt="avatar_icon"
            width="60"
          />
        </div>
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

  return (
    <main>
      <div className="container">
        <h2>{gameInfo.title}</h2>
        <h3>Current Active Parties</h3>
        <img src={gameInfo.image_url} alt="game-logo" width="40" />
        <div className="parties-list">{generateParties()}</div>
        <button type="submit" className="join-party-button">
          +
        </button>
      </div>
      <CreatePartyForm />
    </main>
  );
}
