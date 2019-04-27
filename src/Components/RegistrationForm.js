import React, { useState } from "react";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";

export default function RegisterForm(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        setError(error)
       );
    
  }

  return (
    <main>
      <div className="registrationForm">
        <h2>Register</h2>
        <p>{error.error}</p>
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

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
