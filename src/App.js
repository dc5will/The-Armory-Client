import React from 'react';
import { Switch, Route } from 'react-router-dom';
<<<<<<< HEAD
import SplashPage from './Components/SplashPage';
import Dashboard from './Components/Dashboard';
import PublicOnlyRoute from './Routes/PublicOnlyRoute'
import PrivateRoute from './Routes/PrivateRoute';
=======
import SplashPage from './components/SplashPage';
import Dashboard from './components/Dashboard';
>>>>>>> 1adcadef7470ddc569cdc9900630c9b2fa855029

function App() {
  return (
  <Switch>
    <PublicOnlyRoute exact path={'/'} component={SplashPage}/>
    <PrivateRoute path={'/dashboard'} component={Dashboard}/>
  </Switch>
  
  )
}

export default App;
