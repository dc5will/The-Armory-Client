import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SplashPage from './Components/SplashPage';
import Dashboard from './Routes/Dashboard';
import PublicOnlyRoute from './Routes/PublicOnlyRoute'
import PrivateRoute from './Routes/PrivateRoute';
import GamePage from './Routes/GamePage';
import PartyPage from './Routes/PartyPage';
import termsOfService from './Routes/TosPage';


import './app.css'


function App() {
  return (
  <Switch>
    <main>
      <PublicOnlyRoute exact path={'/'} component={SplashPage}/>
      <PublicOnlyRoute exact path={'/tos'} component={termsOfService} />
      <PrivateRoute path={'/dashboard'} component={Dashboard}/>
      <PrivateRoute path={'/games/:gameId'} component={GamePage}/>
      <PrivateRoute path={'/party/:partyId'} component={PartyPage}/>
    </main>
  </Switch>
  )
}

export default App;
