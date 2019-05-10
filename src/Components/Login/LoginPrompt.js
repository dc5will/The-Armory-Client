import React from 'react';
import './Login.css';

export default function LoginPrompt(props) {
  return (
    <div className="login-req-prompt login-prompt">
      <h2>Already have an account?</h2>
      <button className="grey-button" type="button" onClick={props.toggle}>Log in</button>
    </div>
  );
}
