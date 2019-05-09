import React, { Component } from 'react';
import config from '../config';
import TokenService from "../services/token-service";
import helpers from '../services/helpers';

const GameContext = React.createContext({
  error: {},
  setError: () => {},
  clearError: () => {},

  setGame: () => {},
  id: {},
  title: {},
  imageUrl: {},
  tags: [],
  partyLimit: {},
  roles: [],
  requirements: [],
  gamemodes: [],

  partiesLoading: true,
  getAllParties: () => {},
  setParties: () => {},
  setPagesAvailable: () => {},
  incrementCurrentPage: () => {},
  partiesAvailable: {},
  pagesAvailable: 1,
  currentPage: 0,
  parties: [],

  setFilters: () => {},
  resetFilters: () => {},
  searchTerm: '',
  gamemodeFilter: 0,
  requirementFilters: [],
  roleFilters: [],
  setGamemodeFilter: () => {},
});

export default GameContext;

export class GameProvider extends Component {
  constructor(props){
    super(props)
    const state = {   
      error: '',

      id: {},
      title: {},
      imageUrl: {},
      tags: [],
      partyLimit: {},
      roles: [],
      requirements: [],
      gamemodes: [],

      partiesLoading: true,
      partiesAvailable: {},
      pagesAvailable: 1,
      currentPage: 0,
      parties: [],

      searchTerm: '',
      gamemodeFilter: 0,
      requirementFilters: [],
      roleFilters: [],
    };
    this.state = state;
  }

  setError = error => {
    this.setState({ error: error.message || error.error });
  }

  clearError = () => {
    this.setState({ error: '' });
  }
  
  setGame = game => {
    this.setState({
      id: game.id,
      title: game.title,
      imageUrl: game.image_url,
      tags: game.tags,
      partyLimit: game.party_limit,
      roles: game.roles,
      requirements: game.requirements,
      gamemodes: game.gamemodes,
    });
  }

  generatePartiesUrl = () => {
    let url = `${config.API_ENDPOINT}/games/${this.state.id}/parties`;

    const { currentPage, requirementFilters, roleFilters, searchTerm, gamemodeFilter } = this.state;

    if (!!currentPage || !!searchTerm || !!gamemodeFilter || requirementFilters.length > 0 || roleFilters.length > 0) {
      url += '?';

      const temp = [];
      currentPage && (temp.push(`page=${currentPage}`));
      searchTerm && (temp.push(`term=${searchTerm}`));
      gamemodeFilter && (temp.push(`gamemode=${gamemodeFilter}`));
      requirementFilters && requirementFilters.forEach(req => {
        temp.push(`reqs=${req}`);
      }); 
      roleFilters && roleFilters.forEach(role => {
        temp.push(`roles=${role}`);
      }); 
      url += temp.join('&');
    }
    return url;
  }

  getPartiesCount = (url) => {
    return fetch(url+'&countonly=true', {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(TokenService.getAuthToken)
    })
      .then(res => {
        return (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      })
      .catch(err => this.setError(err));
  }

  getAllParties = async (countonly) => {
    const { currentPage } = this.state;
    const url = this.generatePartiesUrl();

    if (countonly === true) {
      return this.getPartiesCount(url);
    } 

    return fetch(url, {
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
      .then(resJson => {
        let newState = {
          // loading: false,
          pagesAvailable: resJson.pages_available,
          partiesAvailable: resJson.parties_available,
          partiesLoading: false,
        };

        if (currentPage) {
          const newParties = [...this.state.parties];
          resJson.parties.forEach(party => {
            if (helpers.findPartyIndex(party.id, newParties) === -1) {
              newParties.push(party);
            } 
          });
          newState.parties = newParties;
        } else {
          newState.parties = resJson.parties;
        }
        this.setState(newState);
      })
      .catch(err => this.setError(err));
  }

  setParties = (parties, pagesAvailable, currentPage) => {
    const newState = { parties, pagesAvailable }
    currentPage && (newState.currentPage = currentPage);
    this.setState(newState);
  }

  setPagesAvailable = (pagesAvailable) => {
    this.setState({ pagesAvailable });
  }

  incrementCurrentPage = (fn) => {
    this.setState({ currentPage: this.state.currentPage + 1 }, () => {
      fn && fn()
    });
  }

  setFilters = (searchTerm, reqs, roles) => {
    const newState = {
      currentPage: 0,
      partiesLoading: true
    };

    (searchTerm !== undefined) && (newState.searchTerm = searchTerm);
    reqs && (newState.requirementFilters = reqs);
    roles && (newState.roleFilters = roles);

    this.setState(newState, this.getAllParties);
  }

  resetFilters = () => {
    const newState = {
      currentPage: 0,
      partiesLoading: true
    };

    const updateSearch = this.state.searchTerm !== '';
    const updateReqs = this.state.requirementFilters.length > 0;
    const updateRoles = this.state.roleFilters.length > 0

    if (updateSearch) {
      newState.searchTerm = '';
    }
    if (updateReqs) {
      newState.requirementFilters = [];
    }
    if (updateRoles) {
      newState.roleFilters = [];
    }

    if (updateSearch || updateReqs || updateRoles) {
      this.setState(newState, this.getAllParties);
    }
  }


  setGamemodeFilter = (gamemode) => {
    this.setState({ 
      currentPage: 0, 
      gamemodeFilter: parseInt(gamemode), 
      partiesLoading: true 
    }, this.getAllParties);
  }

  render(){
    const value = {
      setError: this.setError,
      clearError: this.clearError,

      setGame: this.setGame,

      getAllParties: this.getAllParties,
      setParties: this.setParties,
      setPagesAvailable: this.setPagesAvailable,
      incrementCurrentPage: this.incrementCurrentPage,

      setFilters: this.setFilters,
      resetFilters: this.resetFilters,
      setGamemodeFilter: this.setGamemodeFilter,

      ...this.state
    }
    return (
      <GameContext.Provider value={value}>
        {this.props.children}
      </GameContext.Provider>
    )
  }
}

  