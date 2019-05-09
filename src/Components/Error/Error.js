import React, { useEffect } from 'react';

let _timeoutId;

export default function Error(props) {
  useEffect(() => {
    _timeoutId = setTimeout(() => props.close(), 20000);

    return () => {
      clearTimeout(_timeoutId)
    }
  });

  const handleClose = (e) => {
    clearTimeout(_timeoutId);
    props.close();
  }
 
  return (
    <div className="error-container">
      <p>{props.error}</p>
      {/* icon here */}
      <button type="button" onClick={handleClose}><i className="fas fa-times"/></button>
    </div>
  )
}