import React, { useState, useEffect, useContext } from "react";
import TokenService from "../services/token-service";
import config from "../config";
import GamesContext from "../Contexts/gamesContext";
import Nav from "../Components/Nav";
import Game from "../Components/Game";

export default function Dashboard(props) {
  const games = useContext(GamesContext);
  const staticData = games.gamesList;
  const [filter, setFilter] = useState("All");

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
    console.log("staticData =", staticData);
    if (staticData.length === 0) {
      return (
        <span className="game-search-no-result">
          Game not found, please try again!
        </span>
      );
    } else {
      return staticData.map((props) => {
        return (
            <Game props={props} />
        );
      });
    }
  }

  // filter for tags
  function filterGames(staticData, keyword) {
    return staticData.map((props, index) => {
      return props.tags.includes(keyword) ? (
          <Game props={props} />
      ) : (
        <div key={index} />
      );
    });
  }

  return (
    <div className="dashboard-container">
      <Nav props={props} />
      <form className="game-search-form" onSubmit={submitSearch}>
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
      <button className="filterGames" onClick={e => setFilter("All")}>
        All
      </button>
      <button className="filterGames" onClick={e => setFilter("Shooter")}>
        Shooter
      </button>
      <button className="filterGames" onClick={e => setFilter("MOBA")}>
        MOBA
      </button>
      <button className="filterGames" onClick={e => setFilter("MMORPG")}>
        MMORPG
      </button>
      <ul>
        {filter === "All"
          ? displayGamesList(staticData)
          : filterGames(staticData, filter)}
      </ul>
    </div>
  );
}
