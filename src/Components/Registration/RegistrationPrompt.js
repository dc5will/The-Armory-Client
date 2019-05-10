import React from 'react';
import './Registration.css';

export default function RegistrationPrompt(props) {
  return (
    <div className="login-req-prompt registration-prompt">
      <h2>Don't have an account?</h2>
      <button className="grey-button" type="button" onClick={props.toggle}>Register</button>
    </div>
  );
}
