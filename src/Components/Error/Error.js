import React from 'react';

export default function Error(props) {
  return (
    <div className="error-container">
      <p>{props.error}</p>
      {/* icon here */}
      <button type="button" onClick={props.close}>X</button>
    </div>
  )
}