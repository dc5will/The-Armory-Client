import React, { useState, useEffect, useContext } from "react";
import GamesContext from "../Contexts/gamesContext";
import Nav from "../Components/Nav";
import Game from "../Components/Game";
import GamesApiService from "../services/games-api-service";

export default function Dashboard(props) {
  const games = useContext(GamesContext);
  const staticData = games.gamesList;
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    GamesApiService.getGames().then(data => {
      games.setGamesList(data);
    });
  }, []);

  const submitSearch = e => {
    e.preventDefault();
    const { search } = e.target;
    const params = { query: search.value };
    console.log("query: search.value =", params);
    GamesApiService.getGamesByTitle(params).then(data => {
      games.setGamesList(data);
    });
  };

  function displayGamesList(staticData) {
    console.log("staticData =", staticData);
    if (staticData.length === 0) {
      return (
        <span className="game-search-no-result">
          Game not found, please try again!
        </span>
      );
    } else {
      return staticData.map(props => {
        return <Game props={props} />;
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
      <br/>
      <p>Filtering by: {filter}</p>
      <ul>
        {filter === "All"
          ? displayGamesList(staticData)
          : filterGames(staticData, filter)}
      </ul>
    </div>
  );
}
