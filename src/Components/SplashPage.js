import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

export default function SplashPage(props) {
  const [toggle, setToggle] = useState(false);

  const handleLoginSuccess = () => {
    const { history } = props;
    const destination = ('/dashboard')
    history.push(destination);
  };

  return toggle !== true ? (
    <div>
    <RegistrationForm onLoginSuccess={handleLoginSuccess} />
    <button onClick={e => setToggle(false)}>Already a member?</button>
    </div>
    ) : (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess}/>
      <button onClick={e => setToggle(true)}>Not a member?</button>
    </div>
  
  );
}
