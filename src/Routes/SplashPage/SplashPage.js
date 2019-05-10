import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../../Components/Registration/RegistrationForm';
import RegistrationPrompt from '../../Components/Registration/RegistrationPrompt';
import LoginForm from '../../Components/Login/LoginForm';
import LoginPrompt from '../../Components/Login/LoginPrompt';
import './splashPage.css';
import config from '../../config';

export default function SplashPage(props) {
  const [toggle, setToggle] = useState(false);
  const formTransitionBackground = useRef(null);

  const handleLoginSuccess = () => {
    const { history } = props;
    const destination = '/dashboard';
    history.push(destination);
  };

  function onClickToggle() {
    setToggle(!toggle);
    if (toggle) {
      formTransitionBackground.current.classList.add('registration-active');
      formTransitionBackground.current.classList.remove('login-active');
    } else {
      formTransitionBackground.current.classList.add('login-active');
      formTransitionBackground.current.classList.remove('registration-active');
    }
  }

  function generateLoginArea() {
    if (toggle === true) {
      return <LoginForm onLoginSuccess={handleLoginSuccess} />
    } else {
      return <LoginPrompt toggle={onClickToggle}/>
    }
  }

  function generateRegistrationArea() {
    if (toggle === false) {
      return <RegistrationForm onLoginSuccess={handleLoginSuccess} />
    } else {
      return <RegistrationPrompt toggle={onClickToggle}/>
    }
  }

  return (
    <div className="splash-container">
      <img className='splash-logo' src={`${config.IMAGES_ENDPOINT}/logo.png`} alt='Squad Armory Logo' onClick={e => props.history.push('/')}/>
      <div className="splash-description">
        <h1>Squad Up! With Squad Armory.</h1>
        <p>Find friends to play with in your favorite online multiplayer game!</p>
      </div>
      <div className='splash-size'>
        <div className="login-reg-container">
          <div className="form-transition-background  registration-active" ref={formTransitionBackground}/>
          {generateRegistrationArea()}
          {generateLoginArea()}
        </div>
      </div>
      <Link to={'/faqs'}>What is Squad Armory?</Link>
    </div>
  );
}
