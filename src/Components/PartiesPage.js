import React, { useState, useEffect } from "react";
import PartyApiService from '../services/parties-api-service';
import CreatePartyForm from '../components/CreatePartyForm';
import config from '../config';

export default function PartiesPage(props) {
  const [parties, setParties] = useState([]);

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



  // fetch request for party listing
  // getPartyList = () => {
  //   fetch(`${config.API_ENDPOINT}/parties/fb1d3c63-6a72-4013-be82-5b523c1dd1cd/`, {
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   }).then(res => {
  //     return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json();
  //   })
  // }

  // createParty = () => {

  // }


  return (
    <main>
      <div className="container">
        <h2>Overwatch</h2>
        <h3>Active Parties</h3>
        <div className="row">
          {parties.map((party, index) => (
            <div key={index}>
              <div className="party-container">
                <p>
                  <strong>{party.title}</strong>
                </p>
                <p>{party.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreatePartyForm />
    </main>
  );
}
