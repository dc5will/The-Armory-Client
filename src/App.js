import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SplashPage from './Components/SplashPage';
import Dashboard from './Components/Dashboard';

function App() {
  return (
  <Switch>
    {/* Public Routes */}
    {/* <Route exact path={'/'} component={**LandingPage**}/> */}
    <Route exact path={'/'} component={SplashPage}/>
    <Route path={'/dashboard'} component={Dashboard}/>
    {/* Private Routes */}
  </Switch>
  
  )
}

export default App;
