import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SplashPage from './Components/SplashPage';

function App() {
  return (
  <Switch>
    {/* Public Routes */}
    {/* <Route exact path={'/'} component={**LandingPage**}/> */}
    <Route exact path={'/'} component={SplashPage}/>
    {/* Private Routes */}
  </Switch>
  
  )
}

export default App;
