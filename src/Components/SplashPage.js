import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <button onClick={e => setToggle(true)}>Already a member?</button>
    <Link to={'/faqs'}>What is Squad Armory?</Link>
    </div>
    ) : (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess}/>
      <button onClick={e => setToggle(false)}>Not a member?</button>
      <Link to={'/faqs'}>What is Squad Armory?</Link>
    </div>
  
  );
}
