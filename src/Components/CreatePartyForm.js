import React, { useState, useContext, useEffect } from "react";


export default function CreatePartyForm(props) {
  const [partyName, setPartyname] = useState("");
  const [partyDescription, setPartyDescription] = useState("");
  const [partyRequirements, setPartyRequirements] = useState("");
  const [spotArr, setSpotArr] = useState([]);
  
//populate roles and requirements from context loaded on main game page


const obj = {
id: "aa0e8ce9-1a71-42e7-804d-6838556fa6ed",
image_url: "https://static.playoverwatch.com/media/wallpaper/logo-burst-wide.jpg",
party_count: "1",
party_limit: 6,
requirements: {1: "Ranked", 2: "Seasonal", 3: "Arcade", 4: "Quickmatch", 5: "E-Sports", 6: "Bronze", 7: "Silver", 8: "Gold", 9: "Platinum", 10: "Diamond", 11: "Master", 12: "Grandmaster"},
roles: {1: "Ranked", 2: "Seasonal", 3: "Arcade", 4: "Quickmatch", 5: "E-Sports", 6: "Bronze", 7: "Silver", 8: "Gold", 9: "Platinum", 10: "Diamond", 11: "Master", 12: "Grandmaster"},
tags: ["Shooter", "FPS"],
title: "Overwatch"};

  function onPartyCreate(e) {
    e.preventDefault();
    console.log(partyName, partyDescription, partyRequirements, spotArr)
      
  }

  useEffect(()=>{
    const emptySpot= { filled:null, roles:[]}
    const spotsArr= [{...emptySpot, filled: 1}];
    for( let i = 1; i<obj.party_limit;i++ ){
      spotsArr.push({...emptySpot})
    }
    setSpotArr(spotsArr)
  })

  

  function mapRequirements(obj){
    return Object.keys(obj.requirements).map((key) => (
      <option key={key} value={key}>{obj.requirements[key]}</option>
    ))};

  function mapSpots(spotsArr){
    return spotsArr.map((spot, i) => {
      if(spot.filled){
        return <input key={i} className='checkbox' type='checkbox' value={spot} checked disabled/>
      } 
        return <input key={i} className='checkbox' type='checkbox' value={spot}/>
    })};
  


  

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
            />
            <br />
            <label htmlFor="party-description-input">Description</label>
            <textarea
              id="party-description-input"
              type="text"
              maxLength='140'
              placeholder="limit 140 chars"
              value={partyDescription}
              required
              onChange={e => setPartyDescription(e.target.value)}
            />

            <br />
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
            </select>
            <br />

            <label htmlFor="party-requirement-input">Party Requirements</label>
            <select
              id="party-requirement-dropdown"
              onChange={e => setPartyRequirements(e.target.value)}
              value={partyRequirements}>
              {mapRequirements(obj)} 
            </select>

            <div className='spot-container'>
              {mapSpots(spotArr)}
            </div>

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


// const placeholderObject = {
//   game_id: '',
//   party: {
//     game_id,
//     title,
//     owner_id,
//     description,
//     require_app,
//   },
//   spots: [
//     {
//       filled: 1,
//       roles: []
//     },
//   ],    
//   req: [ 
//   ],  
// }