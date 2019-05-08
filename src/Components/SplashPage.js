import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import './splashPage.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function SplashPage(props) {
  const [toggle, setToggle] = useState(false);

  const handleLoginSuccess = () => {
    const { history } = props;
    const destination = '/dashboard';
    history.push(destination);
  };

  return (
    <div className="splash-container">
    <div className='splash-size'>
      <div className={toggle !== true ? 'creds-container' : 'hidden'}>
        {toggle !== true ? (
          <RegistrationForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div className="disable" />
        )}
        <div className="navigator" />
      </div>
      <div className={toggle ? 'creds-container' : 'hidden'}>
        {toggle ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div className="disable" />
        )}
      </div>
      <div className="navigator">
        <button onClick={e => setToggle(!toggle)}>
          {toggle !== true ? `Already a member?` : `Not a member?`}
        </button>
        <p/>
        <Link to={'/faqs'}>What is Squad Armory?</Link>
      </div>
      </div>
    </div>
  );
}
