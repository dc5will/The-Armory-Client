import React, { useState, useEffect } from "react";
import PartyApiService from '../services/parties-api-service';
import CreatePartyForm from './CreatePartyForm';

export default function PartiesPage(props) {
  const [parties, setParties] = useState([]);
  // const [games, setGames] = useState('');

  useEffect(
    () => {
    // populate party listing from API
      PartyApiService.getAllParties().then(parties => {
        let partyListing = [];
        parties.forEach(party => {
          partyListing.push(party);
        });
        setParties(partyListing);
      })
    }
  );

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
        <button type='submit' className='join-party-button'>Join</button>
      </div>

      <CreatePartyForm />
    </main>
  );
}
