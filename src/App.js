import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SplashPage from './Components/SplashPage';
import Dashboard from './Components/Dashboard';
import PublicOnlyRoute from './Routes/PublicOnlyRoute'
import PrivateRoute from './Routes/PrivateRoute';
import './app.css'
import CreatePartyForm from './Components/CreatePartyForm';

function App() {
  return (
  <Switch>
    
    <PublicOnlyRoute exact path={'/'} component={SplashPage}/>
    <Route exact path={'/party'} component={CreatePartyForm}/>
    <PrivateRoute path={'/dashboard'} component={Dashboard}/>
  </Switch>
  
  )
}

export default App;
