import React, { useState, useContext } from 'react';
import PartyContext from '../../Contexts/partyContext';
import TokenService from '../../services/token-service';
import config from '../../config';

export default function PartyChat(props) {
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState('');
  const [editNewMessage, setEditNewMessage] = useState('');
  const [optionsButton, setOptionsButton] = useState('');
  const context = useContext(PartyContext);

  function generateForm() {
    return (
      <form className="chat-form" onSubmit={e => handleSubmit(e)}>
        <input
          aria-label="chat-input"
          className="chat-input"
          type="text"
          value={message}
          onChange={e => handleChatChange(e)}
        />
        <button className="chat-submit-button" type="submit">
          Send
        </button>
      </form>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.sendChatMessage(message);
    setMessage('');
  }

  function handleChatChange(e) {
    setMessage(e.target.value);
  }

  function generateChat() {
    return (
      <div className="chat-bar">
        <ul className="chat-log-container">
          {context.partyChat.map(message => {
            return (
              <li
                className="chat-message-container"
                key={message.id}
                id={message.id}
              >
                {generateMessage(message)}
                {generateUserOptionsButton(message)}
              </li>
            );
          })}
        </ul>
        {generateForm()}
      </div>
    );
  }

  function generateUserOptionsButton(message) {
    const { sub } = TokenService.parseJwt(TokenService.getAuthToken());
    if (message.username === sub) {
      if (optionsButton !== message.id) {
        return (
          <div className='usr-op-ctr'>
          <button
            className="user-options-button"
            id={message.id}
            onClick={e => handleOptionsButtonClick(e)}
          >
            #
          </button>
          </div>
        );
      } else {
        return (
          <div className='usr-op-ctr-exp'>
            <button
              className="user-options-button"
              onClick={e => handleCloseOptionsButton(e)}
            >
              #
            </button>
            {generateEditButton(message)}
            {generateDeleteButton(message)}
          </div>
        );
      }
    }
  }

  function handleCloseOptionsButton(e) {
    setOptionsButton('');
    setEditId('');
  }

  function handleOptionsButtonClick(e) {
    setOptionsButton(e.target.id);
  }

  function generateDeleteButton(message) {
    return (
      <button
        className="user-options-button"
        id={message.id}
        onClick={e => handleDeleteMessage(e)}
      >
        Delete
      </button>
    );
  }

  function handleDeleteMessage(e) {
    const targetMessage = context.partyChat.find(
      message => message.id === e.target.id
    );
    props.deleteChatMessage(targetMessage);
  }

  function generateMessage(message) {
    if (editId !== message.id) {
      return (
        <>
          <div className="avatar-msg-ctr">
            <img className="avatar-msg" src={`${config.IMAGES_ENDPOINT}/user-icons/${message.avatar_url}`} alt="avatar" />
          </div>
          <section className="msg-txt-ctr">
            <div className="msg-hdr">
              <h4 className="chat-message-user">{message.username}: </h4>
              <p className="time-stamp">{message.time_created}</p>
            </div>
            <div className="chat-msg-body-ctr">
              <p className="chat-message-body">{message.message_body}</p>
              {message.edited ? <p className="edited-message">(edited)</p> : ''}
            </div>
          </section>
        </>
      );
    } else if (editId === message.id) {
      return (
        <>
          <p className="time-stamp">{message.time_created}</p>
          <p className="chat-message-user">{message.username}: </p>
          <form className="edit-form" onSubmit={e => handleEditSubmit(e)}>
            <input
              className="edit-input"
              defaultValue={message.message_body}
              id={message.id}
              onChange={e => handleEditChange(e)}
            />
            <button className="save-edit-button" id={message.id}>
              Save
            </button>
          </form>
        </>
      );
    }
  }

  function generateEditButton(message) {
    return (
      <button
        className="user-options-button"
        id={message.id}
        onClick={e => editMessage(e)}
      >
        Edit
      </button>
    );
  }

  function handleEditChange(e) {
    setEditNewMessage(e.target.value);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    props.sendChatEdit(editNewMessage, editId);
    setEditId('');
    setOptionsButton('');
  }

  function editMessage(e) {
    setEditId(e.target.id);
  }

  return <div className="chat-main-container">{generateChat()}</div>;
}
