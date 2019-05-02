import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import TokenService from "../services/token-service";
import config from "../config";
import GamesContext from "../Contexts/gamesContext";
import Nav from "../Components/Nav";

export default function Dashboard(props) {
  const games = useContext(GamesContext);
  const staticData = games.gamesList;
  const [filter, setFilter] = useState('All');

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

  const submitSearch = e => {
    e.preventDefault();
    const { search } = e.target;
    const params = { query: search.value };
    console.log("query: search.value =", params);
    getGamesByTitle(params).then(data => {
      games.setGamesList(data);
    });
  };

  function getGamesByTitle(params) {
    let url = `${config.API_ENDPOINT}/games`;
    // console.log(url);
    if (params.query) {
      url += `?query=${encodeURIComponent(params.query)}`;
    }
    return fetch(url, {
      method: "GET"
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }

  function displayGamesList(staticData) {
    console.log('staticData =', staticData)
    if (staticData.length === 0) {
      return <span id='game-search-no-result'>Game not found, please try again!</span>
    } else {
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
  }

  // filter for tags
  function filterGames(data, keyword) {
    return data.map((item, i) => {
      return item.tags.includes(keyword) ? (
        <div key={i}>
          <Link to={`/games/${item.id}`}>
            <img src={item.image_url} alt="Game Cover" />
            <h3>{item.title}</h3>
          </Link>
          {item.tags.map((tag, i) => {
            return <span key={i}>{tag} | </span>;
          })}
          <p>Available Parties: {item.party_count}</p>
        </div>
      ) : (
        <div key={i} />
      );
    });
  }

  return (
    <div className="dashboard-container">
      <Nav props={props} />
      <form className='game-search-form' onSubmit={submitSearch}>
        <input
          id="title-search-input"
          type="text"
          name="search"
          placeholder="Enter game title"
        />
        <button type="submit" className="games-search-button">
          Search
        </button>
      </form>
      {/* {displayGamesList(staticData)} */}
      <button className="filterGames" onClick={e => setFilter('All')}>
        All
      </button>
      <button className="filterGames" onClick={e => setFilter('Shooter')}>
        Shooter
      </button>
      <button className="filterGames" onClick={e => setFilter('MOBA')}>
        MOBA
      </button>
      <button className="filterGames" onClick={e => setFilter('MMORPG')}>
        MMORPG
      </button>
      <ul>
        {filter === 'All'
          ? displayGamesList(staticData)
          : filterGames(staticData, filter)}
      </ul>
    </div>
  );
}
