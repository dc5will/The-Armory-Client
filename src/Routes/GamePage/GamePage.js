import React, { useState, useEffect, useContext } from "react";
import CreatePartyForm from "../../Components/CreatePartyForm/CreatePartyForm";
import config from "../../config";
import TokenService from "../../services/token-service";
import GameContext from '../../Contexts/gameContext';
import FilterPartiesForm from '../../Components/FilterPartiesForm/FilterPartiesForm';
import helpers from '../../services/helpers';
import Party from '../../Components/Party/Party';
import Error from '../../Components/Error/Error';

import './GamePage.css';

import io from 'socket.io-client';
let socket;

export default function GamePage(props) {
  const gameContext = useContext(GameContext);
  const [loading, toggleLoading] = useState(true);
  const [showCPF, toggleCPF] = useState(false);

  function getGame() {
    return fetch(`${config.API_ENDPOINT}${props.match.url}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(TokenService.getAuthToken)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(game => {
        gameContext.setGame(game);
      });
  }

  async function populateContext() {
    try {
      await getGame();
      await gameContext.getAllParties();
      toggleLoading(false);
    } catch(err) {
      gameContext.setError(err);
    }
  }

  useEffect(() => {
    // populate party listing from API
    populateContext();
    // get game stuff
    // connect to socket io for this game
    socket = io('http://localhost:8000');
    socket.emit('join room', props.match.url);

    return () => {
      socket.emit('leave game');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('posted party', async function(data) { 
      let pagesAvailable = data.pages_available;
      let partiesAvailable = data.parties_available;
      //if we have filters on we need an accurate count
      if (checkIfFilters()) {
        const temp = await gameContext.getAllParties(true);
        pagesAvailable = temp.pages_available;
        partiesAvailable = temp.parties_available;
      }
      if (checkFilters(pagesAvailable, data.party)) {
        gameContext.setParties([...gameContext.parties, {
          ...data.party,
          pages_available: pagesAvailable,
          parties_available: partiesAvailable
        }]);
      }
    });

    socket.on('spot updated', function(data) {
      let index = helpers.findPartyIndex(data.party.id, gameContext.parties);
      if (index !== -1) {
        let newParties = [...gameContext.parties];
        newParties[index] = data.party;
        gameContext.setParties(newParties, data.pages_available);
      }
    });

    socket.on('delist party', function(data) {
      let index = helpers.findPartyIndex(data.party.id, gameContext.parties);
      if (index !== -1) {
        let newParties = [...gameContext.parties];
        newParties.splice(index, 1);
        gameContext.setParties(
          newParties, 
          data.pages_available,
          (data.pages_available < gameContext.currentPage) && data.pages_available
        );
      }
    })

    return () => {
      socket.off('posted party');
      socket.off('spot updated');
    }
  }, [gameContext.parties]);

  function checkIfFilters() {
    return (!!gameContext.searchTerm || !!gameContext.gamemodeFilter || gameContext.requirementFilters.length > 0 || gameContext.roleFilters.length > 0) ;
  }

  function checkFilters(pagesAvailable, party) {
    const { requirementFilters, roleFilters, searchTerm, gamemodeFilter, requirements, roles, gamemodes } = gameContext;
    if (gameContext.currentPage !== (pagesAvailable - 1)) return false;
    let relevant = true;

    //requirement filters check
    if (requirementFilters.length > 0) {
      for (let i = 0; i < requirementFilters.length; i++) {
        let temp = false;
        for (let j = 0; j < party.reqs.length; j++) {
          if (party.reqs[j].name === requirements[requirementFilters[i]].name) temp = true;
        }
        if (temp === false) relevant = false;
        break;
      }
    }
    if (relevant === false) return false;

    //role filters check
    if (roleFilters.length > 0) {
      //for each filter
      for (let i = 0; i < roleFilters.length; i++) {
        let temp = false;
        //for each spot
        for (let j = 0; j < party.spots.length; j++) {
          //check for each role in each spot
          for (let k = 0; k < party.spots[j].roles.length; k++) {
            if (party.spots[j].roles[k].name === roles[roleFilters[i]].name) temp = true;
          }
        }
        if (temp === false) relevant = false;
      }
    }
    if (relevant === false) return false;

    //searchTerm check
    if (searchTerm) {
      if (!(party.title.includes(searchTerm) || party.description.includes(searchTerm))) relevant = false;
    }
    if (relevant === false) return false;

    //gamemode check
    if (gamemodeFilter) {
      if (party.gamemode.name !== gamemodes[gamemodeFilter].name) return false;
    }

    return relevant;
  }

  function generateParties() {
    return gameContext.parties.map((party, index) => (
      <Party key={index} index={index} party={party} gameId={props.match.params.gameId}/>
    ));
  }

  function toggleCreatePartyForm(e) {
    e.preventDefault();
    toggleCPF(!showCPF);
  }

  async function handlePartiesScroll(e) {
    //document, NOT window
    if (e.target.scrollTop/(e.target.scrollHeight - e.target.clientHeight) === 1) {
      if (gameContext.currentPage < gameContext.pagesAvailable - 1) {
        gameContext.incrementCurrentPage(gameContext.getAllParties);
      }
    };
  }

  function generateGameTags() {
    return gameContext.tags.map((tag, i) => {
      return <span key={i} className="small-detail">{tag}</span>
    });
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="container">
      {gameContext.error && <Error close={gameContext.clearError} error={gameContext.error}/>}
      <div className="party-details">
        <div className="party-details-top">
          <img className="party-details__image" src={gameContext.imageUrl} alt="game-logo" width="40" />
          <div className="party-details__main">
            <h2>{gameContext.title}</h2>
            {generateGameTags()}
          </div>

          {/* <p>{gameContext.partiesAvailable}</p> */}
          <FilterPartiesForm />
        </div>
        <div className="party-details__create-container">
          <button className="green-button create-squad-button" type="button" onClick={toggleCreatePartyForm}>Create Party</button>
        </div>
      </div>
      {showCPF && <CreatePartyForm toggleCreatePartyForm={toggleCreatePartyForm} roomUrl={props.match.url} history={props.history}/>}
      <hr/>
      {gameContext.partiesLoading 
        ? (
            <div className="party-list">
              Loading...
            </div>
          )
        : (
            <div className="party-list" onScroll={handlePartiesScroll}>
              <h3>Current Active Parties</h3>
              <div className="parties-list">
                {generateParties()}
              </div>  
            </div>
          )
      }
    </div>
  );
}
