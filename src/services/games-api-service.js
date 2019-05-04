import config from '../config';
import TokenService from '../services/token-service';

const GamesApiService = {
  getGames() {
    return fetch(`${config.API_ENDPOINT}/games`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? TokenService.clearAuthToken() : res.json()))
  },
  getGamesByTitle(params) {
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
}

export default GamesApiService;