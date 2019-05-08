import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './modal.css'

export default function Modal({ isShowing, hide, content, noDisableScrolling }) {
  return ReactDOM.createPortal(
    (isShowing)
      ? <ModalComponent content={content} hide={hide} noDisableScrolling={noDisableScrolling}/>
      : null,
    document.body
  );
}

function ModalComponent({ hide, content, noDisableScrolling }) {
  useEffect(() => {
    if (!noDisableScrolling) {
      document.body.classList.add('no-scroll');
    }
    
    return () => {
      if (!noDisableScrolling) {
        document.body.classList.remove('no-scroll');
      }
    }
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <button type="button" className="modal-close-button green-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <i className="fas fa-times"/>
          </button>
          {content}
        </div>
      </div>
    </div>
  );
}