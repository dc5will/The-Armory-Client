import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SplashPage from './Components/SplashPage';
import Dashboard from './Routes/Dashboard';
import PublicOnlyRoute from './Routes/PublicOnlyRoute'
import PrivateRoute from './Routes/PrivateRoute';
import GamePage from './Routes/GamePage';
import './app.css'


function App() {
  return (
  <Switch>
    <main>
      <PublicOnlyRoute exact path={'/'} component={SplashPage}/>
      <PrivateRoute path={'/dashboard'} component={Dashboard}/>
      <PrivateRoute path={'/games/:gameId'} component={GamePage}/>
    </main>
  </Switch>
  )
}

export default App;
