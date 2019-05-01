import React, { useState, useContext } from "react";
import PartyContext from "../../Contexts/partyContext";
import TokenService from "../../services/token-service";

export default function PartyChat(props) {
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState("");
  const [editNewMessage, setEditNewMessage] = useState("");
  const context = useContext(PartyContext);

  function generateForm() {
    return (
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          value={message}
          onChange={e => handleChatChange(e)}
        />
        <button type="submit">Send</button>
      </form>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.sendChatMessage(message);
    setMessage("");
  }

  function handleChatChange(e) {
    setMessage(e.target.value);
  }

  function generateChat() {
    return (
      <ul>
        {context.partyChat.map(message => {
          return (
            <li
              className="chat-message-container"
              key={message.message_id}
              id={message.message_id}
            >
              {generateMessage(message)}
              {generateEditButton(message)}
            </li>
          );
        })}
      </ul>
    );
  }

  function generateMessage(message) {
    if (editId !== message.message_id) {
      return (
        <p className="chat-message">
          {message.sub}: {message.message}
        </p>
      );
    } else if (editId === message.message_id) {
      return (
        <form onSubmit={e => handleEditSubmit(e)}>
          <input
            defaultValue={message.message}
            id={message.message_id}
            onChange={e => handleEditChange(e)}
          />
          <button
            className="save-edit-button"
            id={message.message_id}
          >
            Save
          </button>
        </form>
      );
    }
  }

  function generateEditButton(message) {
    const { sub } = TokenService.parseJwt(TokenService.getAuthToken());
    if(message.sub === sub){
      return (
        <button className='edit-chat-button' id={message.message_id} onClick={e => editMessage(e)}>
            Edit
          </button>
      );
    } else {
      return '';
    }
  }

  function handleEditChange(e) {
    setEditNewMessage(e.target.value);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    props.sendChatEdit(editNewMessage, editId);
    setEditId("");
  }

  function editMessage(e) {
    setEditId(e.target.id);
  }

  return (
    <div>
      {generateChat()}
      {generateForm()}
    </div>
  );
}
