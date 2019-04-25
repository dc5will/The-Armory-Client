import React, { useState } from "react";

export default function CreatePartyForm(props) {
  const [partyName, setPartyname] = useState("");
  const [partyDescription, setPartyDescription] = useState("");
  const [chooseGame, setChooseGame] = useState("");
  const [partyRequirements, setPartyRequirements] = useState("");

  async function onPartyCreate() {
    try {
      // insert API services for party creation
      props.history.replace("/homepage?");
    } catch (error) {
      console.log(error.message);
    }
  }

  // generate party requirements page
  // generatePartyRequirements = () => {
  //   grab game.id and populate party requirements dropdown
  // };

  return (
    <main>
      <div className="createPartyForm">
        <h2>Create Party</h2>

        <form className="create-party-form" onSubmit={e => e.preventDefault()}>
          <div className="input-field">
            <label htmlFor="party-name-input">Party Name</label>
            <input
              id="party-name-input"
              type="text"
              placeholder="party"
              value={partyName}
              required
              onChange={e => setPartyname(e.target.value)}
            /><br/>
            <label htmlFor="party-description-input">Description</label>
            <input
              id="party-description-input"
              type="text"
              placeholder="limit 140 chars"
              value={partyDescription}
              required
              onChange={e => setPartyDescription(e.target.value)}
            /><br/>
            <label htmlFor="party-game-dropdown">Choose Game</label>
            <select
              id="party-game-dropdown"
              onChange={e => setChooseGame(e.target.value)}
              value={chooseGame}
            >
              <option>Overwatch</option>
              <option>Final Fantasy XIV</option>
              <option>League of Legends</option>
              <option>Fortnite</option>
              <option>Apex Legends</option>
              <option>DOTA 2</option>
              <option>CSGO</option>
              <option>Rainbow 6 Siege</option>
            </select><br/>
            <label htmlFor="party-requirement-input">Party Requirements</label>
            <select
              id="party-requirement-dropdown"
              onChange={e => setPartyRequirements(e.target.value)}
              value={partyRequirements}
            >
              {/* {generatePartyRequirements()} */}
              <option>Ranked</option>
              <option>Casual</option>
              <option>Competitive</option>
              <option>Fortnite</option>
            </select>
          </div>

          <button
            type="submit"
            className="create-party-button"
            onClick={onPartyCreate}
          >
            Create Party
          </button>
        </form>
      </div>
    </main>
  );
}
