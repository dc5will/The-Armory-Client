import React, { useEffect, useContext, useState } from 'react';
import TokenService from '../services/token-service';
import config from '../config';
import PartyContext from '../Contexts/partyContext';
import io from 'socket.io-client';
let socket;

export default function PartyPage(props) {
  const partyContext = useContext(PartyContext);
  const [partyState, setParty] = useState('');
  const party = partyState;

  useEffect(() => {
    getPartyById()
      .then(res => setParty(res))
      .then(partyContext.setParty(partyState));
      socket = io('http://localhost:8000');
  }, []);


  function getPartyById(props) {
    return fetch(
      `${config.API_ENDPOINT}/parties/fb1d3c63-6a72-4013-be82-5b523c1dd1cd`, //this will need to change back to props.match when the join party functionality is ready
      {
        headers: {
          authorization: `Bearer ${TokenService.getAuthToken()}`
        }
      }
    ).then(res => (!res.ok ? TokenService.clearAuthToken() : res.json()));
  }

  //probably no the right way to call socket.io, do I need useEffect?
  //also, tried setting up prompt and triggering it during a state change
  //but nothing was happening.
  function leave(e, props){
    e.preventDefault()
      socket.emit('leave room', 'fb1d3c63-6a72-4013-be82-5b523c1dd1cd');
    //console.log(window.history.back())

  }

  function generateReqs(party) {
    return party.reqs.map((req, i) => {
      return <li key={i}>{req.req_name}</li>;
    });
  }

  function generateRoles(party) {
    return party.spots.map(spot => {
      return spot.roles.map((role, i) => {
        const user = spot.filled
        return <li key={i}>{role.role_name} - {user!==null ? user.username: 'Available'}</li>;
      });
    });
  }

  function generateDisplayParty(party) {
    return (
      <div>
        <h1>{party.title}</h1>
        <p>{party.description}</p>
        <h3>Spots:</h3>
        <ul>{generateRoles(party)}</ul>
        <h3>Requirements:</h3>
        <ul>{generateReqs(party)}</ul>
      </div>
    );
  }


  return (
      <div>
        <div>
          {party ? generateDisplayParty(party) : 'Loading'}
        </div>
        <button onClick={e => leave(e)}>Leave party</button>
      </div>
  )
}
