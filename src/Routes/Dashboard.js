import React, { useState, useEffect, useContext, useRef } from "react";
import GamesContext from "../Contexts/gamesContext";
import Nav from "../Components/Nav";
import Game from "../Components/Game/Game";
import GamesApiService from "../services/games-api-service";
import './dashboard.css'

export default function Dashboard(props) {
  const games = useContext(GamesContext);
  const staticData = games.gamesList;
  const [filter, setFilter] = useState("All");
  const formRef = useRef(null);

  useEffect(() => {
    GamesApiService.getGames().then(data => {
      games.setGamesList(data);
    });
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', moveFormToTop);
    return () => {
      document.removeEventListener('scroll', moveFormToTop);
    }
  }, [formRef]);

  function moveFormToTop() {
    if (document.documentElement.clientWidth <= 900) {
      if (document.documentElement.scrollTop <= 90) {
        formRef.current.classList.remove('games-form-top')
      } else {
        formRef.current.classList.add('games-form-top')
      }
    }
  }

  const submitSearch = e => {
    e.preventDefault();
    const { search } = e.target;
    const params = { query: search.value };
    GamesApiService.getGamesByTitle(params).then(data => {
      games.setGamesList(data);
    });
  };

  function displayGamesList(staticData) {
    if (staticData.length === 0) {
      return (
        <span className="game-search-no-result">
          Game not found, please try again!
        </span>
      );
    } else {
      return staticData.map(props => {
        return <Game props={props} key={props.id} />;
      });
    }
  }

  // filter for tags
  function filterGames(staticData, keyword) {
    return staticData.map((props, index) => {
      return props.tags.includes(keyword) ? (
        <Game props={props} key={props.id}/>
      ) : (
        <div key={index} />
      );
    });
  }

  function generateFilterTabs() {
    const filters = ['All', 'Shooter', 'MOBA', 'MMORPG'];
    return filters.map((fltr, i) => {
      if (fltr === filter) {
        return <div key={i} className="game-search__fake-tab">{fltr}</div>
      } else {
        return <button key={i} type="button" className="game-search__tab" onClick={e => setFilter(fltr)}>
          {fltr}
        </button>
      }
    });
  }

  return (
    <div className="dashboard-container">
      <form className="game-search-form" onSubmit={submitSearch} ref={formRef}>
        <fieldset className="game-search-fieldset">
          <legend>Search</legend>
          <label className="input-with-icon">
            <i className="fas fa-search game-search__relative-fieldset-icon"></i>
            <input
              id="title-search-input"
              type="text"
              name="search"
              placeholder="Enter game title..."
              className="solo-input-transitions"
            />
          </label>
          <button id="games-search-button" type="submit" className="games-search-button">
            Search
          </button>
        </fieldset>
        <div className='filter-tabs'>
          {generateFilterTabs()}
        </div>
      </form>
      <ul className="game-display-container">
        {filter === "All"
          ? displayGamesList(staticData)
          : filterGames(staticData, filter)}
      </ul>
    </div>
  );
}
