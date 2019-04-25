import config from '../config';
import TokenService from './token-service';

const PartyApiService = {
  getAllParties() {
    return fetch(`${config.API_ENDPOINT}/parties/fb1d3c63-6a72-4013-be82-5b523c1dd1cd/`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(TokenService.getAuthToken)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
}

export default PartyApiService;