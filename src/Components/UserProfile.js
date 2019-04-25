import React, { useState } from "react";

export default function UserProfile(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar_url, setAvatar_url] = useState("");

  async function onProfileSubmit() {
    // add in api services for updating user profile information
  }

  return (
    <main>
      <div className="profileForm">
        <h2>Profile Settings</h2>
        <form className="profile-form" onSubmit={e => e.preventDefault()}>
          <div className="input-field">
            <label htmlFor="profile-name-input">Username: </label>
            <input
              id="profile-name-input"
              type="text"
              placeholder="change username"
              value={username}
              required
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="profile-email-input">Email: </label>
            <input
              id="profile-email-input"
              type="email"
              placeholder="change email"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="profile-password-input">Password: </label>
            <input
              id="profile-password-input"
              type="password"
              placeholder="change password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {/* Let users upload their own images? Predetermined avatars? Link to their own images hosted elsewhere? */}
          <div className="input-field">
            <label htmlFor="profile-avatar-input">Avatar: </label>
            <input
              id="profile-avatar-input"
              type="url"
              placeholder="change avatar"
              value={avatar_url}
              required
              onChange={e => setAvatar_url(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button" onClick={onProfileSubmit}>
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}
