import React, { useState } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import Error from '../Error/Error';
import useModal from '../Modal/useModal';
import Modal from '../Modal/Modal';
import TOS from '../ToSPage/TosPage';
import './Registration.css';

export default function RegisterForm(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isShowing, toggle } = useModal();

  const [invalidPassword, setInvalidPassword] = useState(undefined);
  const [invalidEmail, setInvalidEmail] = useState(undefined);
  const [invalidUsername, setInvalidUsername] = useState(undefined);

  function onRegister(e) {
    e.preventDefault();
    AuthApiService.postUser({ email, username, password })
      .then(res => {
        return AuthApiService.postLogin({ email, password });
      })
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        props.onLoginSuccess();
      })
      .catch(error => {
        if (error.message) {
          setError(error.message);
          return;
        }
        (error.passwordError) ? setInvalidPassword(error.passwordError) : setInvalidPassword(undefined);
        (error.emailError) ? setInvalidEmail(error.emailError) : setInvalidEmail(undefined);
        (error.usernameError) ? setInvalidUsername(error.usernameError) : setInvalidUsername(undefined);
      });
  }

  return (
    <form
      className="registration-form login-reg-form"
      onSubmit={e => {
        onRegister(e);
      }}
    >
      {error && <Error close={() => setError(undefined)} error={error}/>}
      <h2 className="registration-header">Register</h2>

      <div className="registration-input-container">
        <label>Email {invalidEmail && <span className="registration-error-msg">{'- ' + invalidEmail}</span>}
          <input
            id="registration-email-input"
            type="email"
            placeholder="example@email.com..."
            className={invalidEmail ? 'invalid-form-input' : ''}
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label>Username {invalidUsername && <span className="registration-error-msg">{'- ' + invalidUsername}</span>}
          <input
            type="text"
            placeholder="username..."
            className={invalidUsername ?'invalid-form-input' : ''}
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>Password {invalidPassword && <span className="registration-error-msg">{'- ' + invalidPassword}</span>}
          <input
            type="password"
            placeholder="password..."
            className={invalidPassword ? 'invalid-form-input' : ''}
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </label>
      </div>

      <div className="registration-form__tos-details">
        <p>{'By registering you agree to our '}
          <button type='button' className="tos-button" onClick={e => toggle()}>
            Terms of Service
          </button>
          .
        </p>
        <Modal
          isShowing={isShowing}
          hide={toggle}
          content={<TOS hide={toggle} />}
        />
      </div>
      <button type="submit" className="green-button login-reg-form__submit-button">
        Register
      </button>
    </form>
  );
}
