import config from '../config';
import TokenService from './token-service';

const GamesApiService = {
  getAllParties() {
    // fetched specific parties id endpoint to test
    return fetch(`${config.API_ENDPOINT}/parties/fb1d3c63-6a72-4013-be82-5b523c1dd1cd/`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(TokenService.getAuthToken)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  // grab all parties for a specific game
  getAllPartiesById(gameId) {
    // fetched specific parties id endpoint to test
    return fetch(`${config.API_ENDPOINT}/parties/${gameId}/`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(TokenService.getAuthToken)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  // http://localhost:8000/api/games/aa0e8ce9-1a71-42e7-804d-6838556fa6ed/parties


}

export default GamesApiService;