import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SplashPage from './components/SplashPage';
import Dashboard from './components/Dashboard';
import PublicOnlyRoute from './routes/PublicOnlyRoute'
import PrivateRoute from './routes/PrivateRoute';
import GamesPage from './components/GamesPage';
import './app.css'
import CreatePartyForm from './Components/CreatePartyForm';

function App() {
  return (
  <Switch>
    
    <PublicOnlyRoute exact path={'/'} component={SplashPage}/>
    <Route exact path={'/party'} component={CreatePartyForm}/>
    <PrivateRoute path={'/dashboard'} component={Dashboard}/>
    <PrivateRoute path={'/games/:gameId'} component={GamesPage}/>
  </Switch>
  
  )
}

export default App;
