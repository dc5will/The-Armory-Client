import React, { useState, useContext, useEffect } from "react";
import SpotInput from "./SpotInput";
import io from 'socket.io-client';
import TokenService from "../../services/token-service";
let socket;

export default function CreatePartyForm(props) {
  const [partyName, setPartyname] = useState("");
  const [partyDescription, setPartyDescription] = useState("");
  const [partyRequirements, setPartyRequirements] = useState("");
  const [spotArr, setSpotArr] = useState({});

  //populate roles and requirements from context loaded on main game page
  const obj = {
    id: "aa0e8ce9-1a71-42e7-804d-6838556fa6ed",
    image_url: "https://static.playoverwatch.com/media/wallpaper/logo-burst-wide.jpg",
    party_count: "1",
    party_limit: 6,
    requirements: { 1: "Ranked", 2: "Seasonal", 3: "Arcade", 4: "Quickmatch", 5: "E-Sports", 6: "Bronze", 7: "Silver", 8: "Gold", 9: "Platinum", 10: "Diamond", 11: "Master", 12: "Grandmaster" },
    roles: { 1: "Ranked", 2: "Seasonal", 3: "Arcade", 4: "Quickmatch", 5: "E-Sports", 6: "Bronze", 7: "Silver", 8: "Gold", 9: "Platinum", 10: "Diamond", 11: "Master", 12: "Grandmaster" },
    tags: ["Shooter", "FPS"],
    title: "Overwatch"
  };

  useEffect(() => {
    let temp = {};
    let blankSpot = {
      filled: null,
      roles: [],
      omitted: false,
      showOptions: false,
    };
    for (let i = 0; i < obj.party_limit; i++) {
      temp[i] = blankSpot;
    }
    setSpotArr(temp);
    //create io instance, move to game route when you can
    socket = io('http://localhost:8000');
    socket.emit('join game', obj.id);

    socket.on('post party error', function(msg) { console.log(msg) });
  }, []);

  function mapRequirements(obj) {
    return Object.keys(obj.requirements).map((key) => (
      <option key={key} value={key}>{obj.requirements[key]}</option>
    ))
  };

  function toggleOptions(index) {
    let temp = {...spotArr};
    Object.keys(temp).forEach(key => {
      if (key === index || temp[key].showOptions) {
        temp[key] = {...temp[key], showOptions: !temp[key].showOptions}
      }
    });
    setSpotArr(temp);
  }

  function omitSpot(index) {
    const newArr = {
      ...spotArr
    };
    newArr[index] = {...spotArr[index], omitted: !newArr[index].omitted, showOptions: false }
    setSpotArr(newArr);
  }

  function mapSpots() {
    let temp = [];
    let tempOmitted = [];
    Object.keys(spotArr).forEach(i => {
      let tempComp = <SpotInput key={i} index={i} omitSpot={omitSpot} omitted={spotArr[i].omitted} showOptions={spotArr[i].showOptions} toggleOptions={toggleOptions}/>;
      if (spotArr[i].omitted) {
        tempOmitted.push(tempComp);
      } else {
        temp.push(tempComp);
      }
    });
    return temp.concat(tempOmitted);
  };


  function onPartyCreate(e) {
    e.preventDefault();
    console.log(partyName, partyDescription, partyRequirements, spotArr)
    socket.emit('post party',
      {
        user_auth: TokenService.getAuthToken(),
        party: {
          game_id: obj.id,
          owner_id: 1,
          title: partyName,
          description: partyDescription,
          require_app: false,
        },
        spots: [],
        req: [],
      }
    )
  }

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
            <label htmlFor="party-description-input">Description</label>
            <textarea
              id="party-description-input"
              type="text"
              maxLength='140'
              placeholder="limit 140 chars"
              value={partyDescription}
              onChange={e => setPartyDescription(e.target.value)}
            />

            <label htmlFor="party-requirement-input">Party Requirements</label>
            <select
              id="party-requirement-dropdown"
              onChange={e => setPartyRequirements(e.target.value)}
              value={partyRequirements}>
              {mapRequirements(obj)}
            </select>

            <div className='spot-container'>
              {mapSpots()}
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