import React, { useState, useEffect, useContext, useRef } from "react";
import config from "../../config";
import TokenService from "../../services/token-service";
import GameContext from '../../Contexts/gameContext';
import helpers from '../../services/helpers';
import Squad from '../../Components/Squad/Squad';
import Error from '../../Components/Error/Error';
import GameInfo from '../../Components/GameInfo/GameInfo';

import './GamePage.css';

import io from 'socket.io-client';
import Dropdown from "../../Components/Dropdown/Dropdown";
import Modal from "../../Components/Modal/Modal";
import ActiveSquad from '../../Components/ActiveSquad/ActiveSquad';
let socket;

export default function GamePage(props) {
  const gameContext = useContext(GameContext);
  const [loading, toggleLoading] = useState(true);
  const [activeSquad, setActiveSquad] = useState(undefined);
  const squadList = useRef(null);

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

  //throws an error - fix later
  // useEffect(() => {
  //   browserBack()
  // },[])

  // function browserBack(){
  //   window.history.pushState(null, null, '/');
  //   window.onpopstate = function () {
  //       window.history.go(1);
  //   };
  // }

  useEffect(() => {
    // populate party listing from API
    populateContext();
    // get game stuff
    // connect to socket io for this game
    socket = io('https://limitless-brushlands-45977.herokuapp.com');
    socket.emit('join room', props.match.url);

    return () => {
      socket.emit('leave game');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handlePartiesScroll);

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
      document.removeEventListener('scroll', handlePartiesScroll);
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

  function handleSquadOnClick(index) {
    setActiveSquad(index);
  }

  function generateParties() {
    if (gameContext.parties.length < 1) {
      return <p>No parties available...</p>;
    }
    return gameContext.parties.map((party, index) => (
      <Squad key={index} index={index} party={party} gameId={props.match.params.gameId} onClick={handleSquadOnClick}/>
    ));
  }

  async function handlePartiesScroll() {
    //document, NOT window
    if (document.documentElement.scrollTop/(document.documentElement.scrollHeight - document.documentElement.clientHeight) === 1) {
      if (gameContext.currentPage < gameContext.pagesAvailable - 1) {
        gameContext.incrementCurrentPage(gameContext.getAllParties);
      }
    };
  }

  function generateGamemodeDropdown() {
    return <div className="squad-list__top-dropdown-container">
      <Dropdown
        name="gamemode"
        className='gamemode-dropdown'
        active={gameContext.gamemodeFilter}
        gameId={gameContext.id}
        onChange={e => gameContext.setGamemodeFilter(e.value)}
        onButtonClick={e => gameContext.setGamemodeFilter(0)}
        placeholder='All'
        startValue={gameContext.gamemodeFilter}
        options={gameContext.gamemodes}
      />
    </div>
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="container">
      {gameContext.error && <Error close={gameContext.clearError} error={gameContext.error}/>}
      <GameInfo history={props.history} roomUrl={props.match.url}/>
      <div className="squad-list-container">
        <div className="squads-list__top">
          <div className="squad-list__top-gamemode-buttons">
            {generateGamemodeDropdown()}
            <button 
              className="show-squad-details-button green-button" 
              type="button" aria-label="show options" 
              onClick={() => {
                //hacky... change this later! Also works poorly with resizing while menu is open.
                let classList = document.getElementById('game-info').classList;
                classList.toggle('display__game-info');
                if (classList.contains('display__game-info') && document.documentElement.clientWidth < 1267) {
                  if (document.documentElement.clientWidth < 883) {
                    squadList.current.setAttribute('style', 'margin-top: 586px;');
                  } else {
                    squadList.current.setAttribute('style', 'margin-top: 120px;');
                  }
                } else {
                  squadList.current.setAttribute('style', 'margin-top: 20px;');
                }
              }}
            >
              <i className="fas fa-bars"/>
            </button>
          </div>
          <ul className="squads-list__top-titles">
            <li className="squads-list__top-titles__info">Squad Info</li>
            <li className="squads-list__top-titles__spots">Spots</li>
            <li className="squads-list__top-titles__owner">Owner</li>
            <li className="squads-list__top-titles__requirements">Requirements</li>
          </ul>
        </div>
        {gameContext.partiesLoading 
          ? (
              <div className="squad-list">
                Loading...
              </div>
            )
          : (
              <ul className="squad-list" ref={squadList}>
                {generateParties()}
              </ul>
            )}
        <Modal
          isShowing={activeSquad || activeSquad===0}
          hide={() => setActiveSquad(undefined)}
          content={
            (gameContext.parties[activeSquad] 
              ? <ActiveSquad party={gameContext.parties[activeSquad]} hide={() => setActiveSquad(undefined)} history={props.history}/>
              : null
            )
          }
        />
      </div>
    </div>
  );
}
