import React, { useState, useEffect, useContext } from 'react';
import TokenService from '../services/token-service';
import config from '../config';
import GamesContext from '../Contexts/gamesContext';
import Nav from './Nav';

export default function Dashboard(props) {
  
  const games = useContext(GamesContext);
  const staticData = games.gamesList
  const [filter, setFilter] = useState({ filter: 'all' });

  useEffect(() => {
    getGames().then(data => {
      games.setGamesList(data);
    })
  },[]);

  function getGames() {
    return fetch(`${config.API_ENDPOINT}/games`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? TokenService.clearAuthToken() : res.json()));
  }


  function handleData(staticData) {
    return staticData.map((data, index) => {
      return (
        <div key={index}>
          <img src={data.image_url} alt="Game Cover" />
          <h3>{data.title}</h3>
          {data.tags.map((tag, i) => {
            return <span key={i}>{tag} | </span>;
          })}
          <p>Available Parties: {data.party_count}</p>
        </div>
      );
    });
  }


  return (
    <div className="dashboard-container">
      <Nav props={props}/>
      <ul>{handleData(staticData)}</ul>
      {/* <p>{filter}</p>
  <button onClick={e => setFilter({filter: 'all'})}>All Games</button>
  <button onClick={e => setFilter({filter: 'all'})}>All Games</button> */}
    </div>
  );
}
