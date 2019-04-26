import React, { useState, useEffect } from "react";
import CreatePartyForm from "./CreatePartyForm";
import config from "../config";
import TokenService from "../services/token-service";

export default function PartiesPage(props) {
  const [parties, setParties] = useState([]);

  // http://localhost:3000/games/aa0e8ce9-1a71-42e7-804d-6838556fa6ed/parties
  
  function getAllParties() {
    console.log(props)
    return fetch(
      // fetched specific parties id endpoint to test
      `${config.API_ENDPOINT}${props.match.url}/parties`,
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

  // api/games/${gameId}
  // http://localhost:8000/api/games/aa0e8ce9-1a71-42e7-804d-6838556fa6ed/ (overwatch)

  // api/games/${gameId}/parties
  // http://localhost:8000/api/games/aa0e8ce9-1a71-42e7-804d-6838556fa6ed/parties

  useEffect(() => {
    // populate party listing from API
    getAllParties().then(parties => {
      let partyListing = [];
      parties.forEach(party => {
        partyListing.push(party);
      });
      setParties(partyListing);
    });
  },[]);

  return (
    <main>
      <div className="container">
        {/* need to grab game title by ID */}
        <h2>Overwatch</h2>
        {/* After seing new mockup, need to fetch tags from games endpoint */}
        <h3>Active Parties</h3>
        <div className="parties-list">
          {parties.map((party, index) => (
            <div key={index}>
              <div className="party-container">
                <p>
                  <strong>{party.title}</strong>
                </p>
                <p>{party.description}</p>
                {/* Don't know how to map out filled and roles keys from spots array */}
                <span>{party.reqs.id}</span>
                <div className="avatar">
                  {/* current dropbox avatar_url doesnt work, but changed to any other url and it works, ex:
                  https://i.ebayimg.com/images/g/PfAAAOSwA3dYIPRN/s-l300.jpg*/}
                  {/* <span>{party.spots[0].filled.avatar_url}</span> */}
                  <img
                    src={party.spots[0].filled.avatar_url}
                    alt="avatar_icon"
                    width="60"
                  />
                </div>
                <span>{party.spots.roles}</span>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="join-party-button">
          +
        </button>
      </div>

      <CreatePartyForm />
    </main>
  );
}
