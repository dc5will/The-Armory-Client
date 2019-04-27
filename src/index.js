import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { GamesProvider } from './Contexts/gamesContext';
import { GameProvider } from './Contexts/gameContext';


ReactDOM.render(
<Router>
  <GamesProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </GamesProvider>
</Router>,
 document.getElementById('root'));

