import React, { useState, useContext } from 'react';
import GameContext from '../../Contexts/gameContext';
import FilterPartiesForm from '../FilterPartiesForm/FilterPartiesForm';
import CreatePartyForm from "../CreatePartyForm/CreatePartyForm";
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';

export default function GameInfo(props) {
  const gameContext = useContext(GameContext);
  const { isShowing, toggle } = useModal();

  function toggleCreatePartyForm(e) {
    e.preventDefault();
    toggle();
  }

  function generateGameTags() {
    return gameContext.tags.map((tag, i) => {
      return <span key={i} className="small-detail">{tag}</span>
    });
  }

  return (  
    <div className="squad-details">
      <div className="squad-details-top">
        <img className="squad-details__image" src={gameContext.imageUrl} alt="game-logo" width="40" />
        <div className="squad-details__main">
          <h2>{gameContext.title}</h2>
          {generateGameTags()}
        </div>
        <FilterPartiesForm />
      </div>
      <div className="squad-details__create-container">
        <button className="green-button create-squad-button" type="button" onClick={toggleCreatePartyForm}>Create Party</button>
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        content={<CreatePartyForm toggleCreatePartyForm={toggleCreatePartyForm} roomUrl={props.roomUrl} history={props.history}/>}
      />
    </div>
  );
}