import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { GamesProvider } from './Contexts/gamesContext';


ReactDOM.render(
<Router>
  <GamesProvider>
    <App />
  </GamesProvider>
</Router>,
 document.getElementById('root'));

