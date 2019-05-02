import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';
import config from '../config';
import GamesContext from '../Contexts/gamesContext';
import Nav from '../Components/Nav';

export default function Dashboard(props) {
  const games = useContext(GamesContext);
  const staticData = games.gamesList;

  useEffect(() => {
    getGames().then(data => {
      games.setGamesList(data);
    });
  }, []);

  function getGames() {
    return fetch(`${config.API_ENDPOINT}/games`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? TokenService.clearAuthToken() : res.json()));
  }

	const submitForm = e => {
		e.preventDefault();
    const { search } = e.target;
    const params = { query: search.value };
    console.log('query: search.value =', params)
		getGamesByTitle(params).then(data => {
      games.setGamesList(data)
      console.log('returned list after search =', games)
		});
	};

  function getGamesByTitle(params) {
    let url = `${config.API_ENDPOINT}/games`;
    console.log(url);
    if (params.query) {
      url += `?query=${encodeURIComponent(params.query)}`;
    }
    return fetch(url, {
      method: 'GET'
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }

  function displayGamesList(staticData) {
    return staticData.map((data, index) => {
      return (
        <div key={index}>
          <Link to={`/games/${data.id}`}>
            <img src={data.image_url} alt="Game Cover" />
            <h3>{data.title}</h3>
          </Link>
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
      <Nav props={props} />
      <form onSubmit={submitForm}>
				<input
					type='text'
					name='search'
					placeholder='Search games'
					className='searchBar'
				/>
        <button type='submit' id='games-search-button'>Search</button>
        </form>
        {displayGamesList(staticData)}
    </div>
  );
}