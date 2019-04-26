import React, { useState, useEffect } from "react";
import CreatePartyForm from "./CreatePartyForm";
import config from "../config";
import TokenService from "../services/token-service";

export default function PartiesPage(props) {
  const [parties, setParties] = useState([]);
  const [game, setGame] = useState("");

  function getAllParties() {
    // fetched specific parties id endpoint to test
    return fetch(
      `${config.API_ENDPOINT}/parties/fb1d3c63-6a72-4013-be82-5b523c1dd1cd/`,
      {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify(TokenService.getAuthToken)
      }
    ).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }

  function getGameById(gameId) {
    // grab all parties for a specific game
    // fetched specific parties id endpoint to test
    return fetch(`${config.API_ENDPOINT}/games/${gameId}/`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(TokenService.getAuthToken)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
  // http://localhost:8000/api/games/aa0e8ce9-1a71-42e7-804d-6838556fa6ed/parties
  // http://localhost:8000/api/games/aa0e8ce9-1a71-42e7-804d-6838556fa6ed/

  useEffect(() => {
    // populate party listing from API
    getAllParties().then(parties => {
      let partyListing = [];
      parties.forEach(party => {
        partyListing.push(party);
      });
      setParties(partyListing);
    });
  });

  return (
    <main>
      <div className="container">
        {/* grab games specific game by ID */}
        <h2>Overwatch</h2>
        <h3>Active Parties</h3>
        <div className="parties-list">
          {parties.map((party, index) => (
            <div key={index}>
              <div className="party-container">
                <p>
                  <strong>{party.title}</strong>
                </p>
                <p>{party.description}</p>
                <span>{party.spots.roles}</span>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="join-party-button">
          Join
        </button>
      </div>

      <CreatePartyForm />
    </main>
  );
}
