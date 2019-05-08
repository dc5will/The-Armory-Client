import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './modal.css'

export default function Modal({ isShowing, hide, content }) {
  return ReactDOM.createPortal(
    (isShowing)
      ? <ModalComponent content={content} hide={hide}/>
      : null,
    document.body
  );
}

function ModalComponent({ hide, content }) {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    
    return () => {
      document.body.classList.remove('no-scroll');
    }
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button green-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <i className="fas fa-times"/>
            </button>
          </div>
            {content}
        </div>
      </div>
    </div>
  );
}