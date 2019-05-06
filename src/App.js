import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SplashPage from './Components/SplashPage';
import Dashboard from './Routes/Dashboard';
import PublicOnlyRoute from './Routes/PublicOnlyRoute'
import PrivateRoute from './Routes/PrivateRoute';
import GamePage from './Routes/GamePage/GamePage';
import PartyPage from './Routes/PartyPage';
import Confirmation from './Components/Confirmation';
import './app.css'
import FAQ from './Components/Faqs/FAQ';
import UserProfile from './Components/UserProfile';




function App() {
  return (
  <Switch>
    <main>
      <Route path={'/confirmation'} component={Confirmation} />
      <Route path={'/prof'} component={UserProfile} />
      <PublicOnlyRoute path={'/faqs'} component={FAQ} />
      <PublicOnlyRoute exact path={'/'} component={SplashPage}/>
      <PrivateRoute path={'/dashboard'} component={Dashboard}/>
      <PrivateRoute path={'/games/:gameId'} component={GamePage}/>
      <PrivateRoute path={'/party/:partyId'} component={PartyPage}/>
    </main>
  </Switch>
  )
}

export default App;
