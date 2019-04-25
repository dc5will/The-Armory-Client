import React, { useState, useEffect, useContext } from 'react';
import TokenService from '../services/token-service';
import config from '../config';
import GamesContext from '../Contexts/gamesContext';

export default function Dashboard() {

  const games = useContext(GamesContext);

  function getGames() {
    return fetch(`${config.API_ENDPOINT}/games`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? TokenService.clearAuthToken() : res.json()));
  }

  useEffect(() => {
    getGames().then(data => {
      games.setGamesList(data);
    })
  },[]);

  const staticData = [
    {
      title: 'Overwatch',
      tags: ['FPS', 'Team-based', 'Hero-shooter'],
      AvailParties: 31,
      img:
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'
    },
    {
      title: 'FFXIV',
      tags: ['MMORPG'],
      AvailParties: 26,
      img:
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'
    },
    {
      title: 'League of Legends',
      tags: ['MOBA', 'Team-based', 'Strategy'],
      AvailParties: 78,
      img:
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'
    },
    {
      title: 'Apex Legends',
      tags: ['FPS', 'Battle Royale', 'Team-based', 'Hero-shooter'],
      AvailParties: 49,
      img:
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'
    },
    {
      title: 'CSGO',
      tags: ['FPS', 'Team-based'],
      AvailParties: 13,
      img:
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'
    },
    {
      title: 'DOTA 2',
      tags: ['MOBA', 'Strategy', 'PvP'],
      AvailParties: 55,
      img:
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'
    },
    {
      title: 'Fortnite',
      tags: ['Third-person shooter', 'Team-based', 'Battle Royale'],
      AvailParties: 3,
      img:
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'
    },
    {
      title: 'Rainbow Six Siege',
      tags: ['FPS', 'Team-based', 'Hero-shooter'],
      AvailParties: 67,
      img:
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png'
    }
  ];

  const [filter, setFilter] = useState({ filter: 'all' });

  function handleData(staticData) {
    return staticData.map((data, index) => {
      return (
        <div key={index}>
          <img src={data.img} alt="Game Cover" />
          <h3>{data.title}</h3>
          {data.tags.map((tag, i) => {
            return <span key={i}>{tag} | </span>;
          })}
        </div>
      );
    });
  }

  return (
    <div className="dashboard-container">
      <ul>{handleData(staticData)}</ul>
      {/* <p>{filter}</p>
  <button onClick={e => setFilter({filter: 'all'})}>All Games</button>
  <button onClick={e => setFilter({filter: 'all'})}>All Games</button> */}
    </div>
  );
}
