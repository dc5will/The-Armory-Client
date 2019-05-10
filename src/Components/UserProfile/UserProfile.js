import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../Contexts/userContext";
import TokenService from "../../services/token-service";
import config from '../../config';
import AuthApiService from "../../services/auth-api-service";
import './UserProfile.css';

export default function UserProfile(props) {
  const [email, setEmail] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const context = useContext(UserContext);
  const curr = context.user;
  const currentEmail = curr.email;

  useEffect(() => {
    populateContext().then(user => {
      context.setUser(user.userInfo);
    });
  }, []);

  function populateContext() {
    const { user_id } = TokenService.parseAuthToken();
    return fetch(`${config.API_ENDPOINT}/user/${user_id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
      return !res.ok ? TokenService.clearAuthToken() : res.json();
    });
  }

  // console.log(props.update)
  
  function confirmNewPassword(newPass, confirmPass) {
    if (newPass) {
      if (newPass === confirmPass) {
        let user = { email, avatar_url, password: newPass };
        saveChanges(user);
        setNewPass("");
        setConfirmPass("");
        setCurrentPass("");
      } else {
        setError("Passwords do not match");
        return;
      }
    } else {
      let user = { email, avatar_url };
      saveChanges(user);
      setEmail('');
    }
  }
  
  function saveChanges(user) {
    const { user_id } = TokenService.parseAuthToken();
    return fetch(`${config.API_ENDPOINT}/user/${user_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(user)
    })
      .then(res =>
        !res.ok ? setError(res.error) : props.update() && props.toggle()
      )
      .then(props.toggle);
  }

  function authorizeChanges(e) {
    e.preventDefault();
    AuthApiService.postLogin({ email: currentEmail, password: currentPass })
      .then(res => {
        // console.log(res.authToken);
        TokenService.saveAuthToken(res.authToken);
        confirmNewPassword(newPass, confirmPass);
      })
      .catch(error => setError(error.error));
  }

  function generateUserIconImages() {
    const imageNames = ['Default-Avatar.png', 'ninja.png', 'pikachu.png', 'soldier76.png', 'cactuar.png', 'axe.png', 'TJICON.png'];
    
    return imageNames.map((name, i) => {
      if (context.user.avatar_url === name) {
        return (
          <li 
            key={i}
            className="user-profile__avatar-fake-checkbox"
          >
            <div className="user-profile__avatar-icon-container">
              <img
                className="user-profile__avatar-fake-image"
                src={`${config.IMAGES_ENDPOINT}/user-icons/${name}`}
                alt={name}
              />
              <i className="squad__spots-filled fas fa-check"/>
            </div>
          </li>
        )
      } else {
        return (
          <li
            aria-label="checkbox"
            tabIndex="0"
            onClick={e => {
              if (avatar_url === name) {
                setAvatar_url('');
              } else {
                setAvatar_url(name);
              }
            }}
            className="user-profile__avatar-container"
            key={i}
          >
            <img
              src={`${config.IMAGES_ENDPOINT}/user-icons/${name}`}
              alt={name}
              className={avatar_url === name ? "user-profile__avatar-image user-profile__avatar-image-active" : "user-profile__avatar-image"}
            />
          </li>
        )
      }
    });
  }

  return (
    <div className="user-profile-container">
      <h2 className="modal-header">Profile Settings</h2>
      <form className="profile-form" onSubmit={e => authorizeChanges(e)}>
        <p>{error}</p>

        <fieldset className="create-squad__fieldset">
          <legend>Choose a new avatar:</legend>
          <ul className="user-profile__input-field">
            {generateUserIconImages()}
          </ul>
        </fieldset>

        <fieldset className="create-squad__fieldset">
          <legend>Enter a new email:</legend>
          <input
            aria-label="profile-email-input"
            type="email"
            placeholder={curr.email}
            className="create-squad__name-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset className="flex-fieldset-column create-squad__fieldset">
          <legend>Enter a new password:</legend>

          <input
            aria-label="profile-new-password-input"
            type="password"
            placeholder="New password..."
            className="create-squad__name-input"
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
          />

          <input
            aria-label="profile-new-c-password-input"
            type="password"
            placeholder="Confirm new password..."
            className="create-squad__name-input"
            value={confirmPass}
            onChange={e => setConfirmPass(e.target.value)}
          />
        </fieldset>
       <fieldset className="flex-fieldset-column create-squad__fieldset">
          <legend>Confirm your password:</legend>
          <input
            aria-label="profile-password-input"
            type="password"
            placeholder="Current password..."
            className="create-squad__name-input"
            required
            value={currentPass}
            onChange={e => setCurrentPass(e.target.value)}
          />
        </fieldset>

        <div className="modal-button-holder create-squad__button-container">
          <button type="submit" className="user-profile__submit-button green-button">
            Update Profile
          </button>
          <button type="button" aria-label="cancel" className="user-profile__cancel-button grey-button" onClick={props.toggle}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
