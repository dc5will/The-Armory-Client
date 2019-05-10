import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SplashPage from './Routes/SplashPage/SplashPage';
import Dashboard from './Routes/Dashboard';
import PublicOnlyRoute from './Routes/PublicOnlyRoute'
import PrivateRoute from './Routes/PrivateRoute';
import GameContextRoute from './Routes/GamePage/GameContextRoute';
import PartyPage from './Routes/PartyPage';
import Confirmation from './Components/Confirmation';
import './app.css'
import FAQ from './Components/Faqs/FAQ';
import PageNotFound from './Routes/NotFound';





function App() {
  return (
    <main>
    <Switch>
      <Route path={'/confirmation'} component={Confirmation} />
      <PublicOnlyRoute path={'/faqs'} component={FAQ} />
      <PublicOnlyRoute exact path={'/'} component={SplashPage}/>
      <PrivateRoute path={'/dashboard'} component={Dashboard}/>
      <PrivateRoute path={'/games/:gameId'} component={GameContextRoute}/>
      <PrivateRoute path={'/party/:partyId'} component={PartyPage}/>
      <Route component={PageNotFound} />
    </Switch>
  </main>
  )
}

export default App;
