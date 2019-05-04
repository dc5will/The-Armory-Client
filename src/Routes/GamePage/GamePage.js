import React, { useState, useEffect, useContext } from "react";
import CreatePartyForm from "../../Components/CreatePartyForm/CreatePartyForm";
import config from "../../config";
import TokenService from "../../services/token-service";
import GameContext from '../../Contexts/gameContext';
import Spot from '../../Components/Spot/Spot';
import FilterPartiesForm from '../../Components/FilterPartiesForm/FilterPartiesForm';
import helpers from '../../services/helpers';

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
      console.log(err);
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
    socket.on('posted party', function(data) { 
      console.log('hey!');
      if (checkFilters(data.pages_available, data.party)) {
        console.log('hi!');
        gameContext.setParties([...gameContext.parties, data.party]);
        if (checkIfFilters) {
          socket.emit('get updated pages available', { 
            gameId: gameContext.id,
            roleFilters: gameContext.roleFilters, 
            requirementFilters: gameContext.requirementFilters,
            searchTerm: gameContext.searchTerm,
            gamemodeFilter: gameContext.gamemodeFilter
          });
        }
      }
    });

    socket.on('updated pages available', function(pagesAvailable) {
      console.log(pagesAvailable);
      gameContext.setPagesAvailable(pagesAvailable);
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
    const { requirementFilters, roleFilters, searchTerm, gamemodeFilter, currentPage, requirements, roles, gamemodes } = gameContext;
    console.log(currentPage, pagesAvailable);
    if (currentPage !== pagesAvailable) return false;
    let relevant = true;

    //requirement filters check
    console.log(requirementFilters);
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

    // //role filters check
    // if (roleFilters.length > 0) {
    //   //for each filter
    //   for (let i = 0; i < roleFilters.length; i++) {
    //     let temp = false;
    //     //for each spot
    //     for (let j = 0; j < party.spots.length; j++) {
    //       //check for each role in each spot
    //       for (let k = 0; k < party.spots[j].roles.length; k++) {
    //         if (party.spots[j].roles[k].name === roles[roleFilters[i]].name) temp = true;
    //       }
    //     }
    //     if (temp === false) relevant = false;
    //   }
    // }
    // if (relevant === false) return false;

    // //searchTerm check
    // if (searchTerm) {
    //   if (!(party.title.includes(searchTerm) || party.description.includes(searchTerm))) relevant = false;
    // }
    // if (relevant === false) return false;

    // //gamemode check
    // if (gamemodeFilter) {
    //   if (party.gamemode !== gamemodeFilter) return false;
    // }

    return relevant;
  }

  function generateSpots(party) {
    return party.spots
      .map((spot, index) => {
        return (
          <Spot key={index} index={index} spot={spot} gameId={props.match.params.gameId} partyId={party.id} history={props.history}/>
        );
      });
  }

  function generateParties() {
    return gameContext.parties.map((party, index) => (
      <div key={index}>
        <div className="party-container">
          <p>
            <strong>{party.title}</strong>
          </p>
          {(party.gamemode) && <><img src={party.gamemode.icon_url} alt=""/><p>{party.gamemode.mode_name}</p></>}
          {party.reqs.map((req, i) => {
            if (req.name) {
              return <p key={i}>{req.name}</p>
            }
          })}
          <p>{party.description}</p>
          <div className="avatar-container">
            {/* current dropbox avatar_url doesnt work, but changed to any other url and it works, ex:
            https://i.ebayimg.com/images/g/PfAAAOSwA3dYIPRN/s-l300.jpg*/}
            {generateSpots(party)}
          </div>
          <span>{party.spots.roles}</span>
        </div>
      </div>
    ));
  }

  function toggleCreatePartyForm(e) {
    e.preventDefault();
    toggleCPF(!showCPF);
  }

  async function handlePartiesScroll(e) {
    if (e.target.scrollTop/(e.target.scrollHeight - e.target.clientHeight) === 1) {
      if (gameContext.currentPage < gameContext.pagesAvailable) {
        gameContext.getAllParties();
      }
    };
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="container">
      <div className="party-details">
        <img src={gameContext.imageUrl} alt="game-logo" width="40" />
        <h2>{gameContext.title}</h2>
        {/* <p>{gameContext.partiesAvailable}</p> */}
        <FilterPartiesForm />
        <button type="button" onClick={toggleCreatePartyForm}>Create Party</button>
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
