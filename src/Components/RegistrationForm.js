import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import UserContext from "../Contexts/userContext";
import useModal from "./Modal/useModal";
import Modal from "./Modal/Modal";
import TOS from "../Routes/TosPage";

export default function RegisterForm(props) {
  const context = useContext(UserContext)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {isShowing, toggle} = useModal();

   function onRegister(e) {
      e.preventDefault();
      AuthApiService.postUser({ email, username, password })
      .then( res => {
        return AuthApiService.postLogin({email, password})
      })
      .then(res => {
         TokenService.saveAuthToken(res.authToken);
         props.onLoginSuccess();
      })
      .catch (error =>
        setError(error.error)
       );
  }

  function tosConfirm(){
    return(
    !context.tosCheck ? 
    <button type="submit" className="submit-button" disabled>Register</button>
     :
    <button type="submit" className="submit-button">Register</button>
    )
  }



  return (
    <main>
      <div className="registrationForm">
        <h2>Register</h2>
        <p>{error}</p>
        <form className="registration-form" onSubmit={e => {onRegister(e)}}>
          <div className="input-field">
            <label htmlFor="registration-name-input">Username: </label>
            <input
              id="registration-name-input"
              type="text"
              placeholder="username"
              value={username}
              required
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="registration-email-input">Email: </label>
            <input
              id="registration-email-input"
              type="email"
              placeholder="example@email.com"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="registration-password-input">Password: </label>
            <input
              id="registration-password-input"
              type="password"
              placeholder="password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>


          <div>
          <button className="button-default" onClick={toggle}>Terms of service</button>
          <Modal isShowing={isShowing} hide={toggle} content={<TOS hide={toggle}/>}/>
          </div>

          {tosConfirm()}

        </form>
      </div>
    </main>
  );
}
