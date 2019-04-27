import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { GamesProvider } from './Contexts/gamesContext';
import { GameProvider } from './Contexts/gameContext';
import { UserProvider } from "./Contexts/userContext";


ReactDOM.render(
<Router>
  <UserProvider>
    <GamesProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </GamesProvider>
  </UserProvider>
</Router>,
 document.getElementById('root'));
