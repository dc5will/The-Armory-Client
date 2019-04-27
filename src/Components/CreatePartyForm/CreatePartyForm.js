import React, { useState, useContext, useEffect } from "react";
import SpotInput from "./SpotInput";
import GameContext from '../../Contexts/gameContext';

import TokenService from "../../services/token-service";


export default function CreatePartyForm(props) {
  const context = useContext(GameContext);
  const [partyName, setPartyname] = useState("");
  const [partyDescription, setPartyDescription] = useState("");
  const [partyRequirements, setPartyRequirements] = useState(undefined);
  const [spotObj, setSpotObj] = useState({});

  //populate roles and requirements from context loaded on main game page

  useEffect(() => {
    let temp = {};
    let blankSpot = {
      filled: null,
      roles: [],
      omitted: false,
      showOptions: false,
    };
    //we don't include the first one as a spot since the owner will always be included
    for (let i = 1; i < context.game.party_limit; i++) {
      temp[i] = blankSpot;
    }
    setSpotObj(temp);
  }, []);

  function mapRequirements() {
    return Object.keys(context.game.requirements).map((key) => {
      return <option key={key} value={key}>{context.game.requirements[key]}</option>
    })
  };

  function toggleOptions(index) {
    let temp = {...spotObj};
    Object.keys(temp).forEach(key => {
      if (key === index || temp[key].showOptions) {
        temp[key] = {...temp[key], showOptions: !temp[key].showOptions}
      }
    });
    setSpotObj(temp);
  }

  function omitSpot(index) {
    const newArr = {
      ...spotObj
    };
    newArr[index] = {...spotObj[index], omitted: !newArr[index].omitted, showOptions: false }
    setSpotObj(newArr);
  }

  function mapSpots() {
    let temp = [];
    let tempOmitted = [];
    Object.keys(spotObj).forEach(i => {
      let tempComp = <SpotInput 
        key={i}
        index={i}
        omitSpot={omitSpot}
        omitted={spotObj[i].omitted}
        showOptions={spotObj[i].showOptions}
        toggleOptions={toggleOptions}
      />;
      if (spotObj[i].omitted) {
        tempOmitted.push(tempComp);
      } else {
        temp.push(tempComp);
      }
    });
    return temp.concat(tempOmitted);
  };


  function onPartyCreate(e) {
    e.preventDefault();
    const spots = [];
    Object.keys(spotObj).forEach(key => {
      if (!spotObj[key].omitted)
        spots.push(spotObj[key]);
    });
    props.socket.emit('post party',
      {
        room_id: props.roomUrl,
        user_auth: TokenService.getAuthToken(),
        party: {
          game_id: context.game.id,
          title: partyName,
          description: partyDescription,
          require_app: false,
        },
        spots,
        requirement: partyRequirements,
      }
    )
  }

  return (
    <main>
      <div className="createPartyForm">
        <h2>Create Party</h2>

        <form className="create-party-form" onSubmit={onPartyCreate}>
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
              value={partyRequirements}
            >
              <option value={null}>None</option>
              {mapRequirements()}
            </select>

            <div className='spot-container'>
              <div className="spot_input">Owner spot</div>
              {mapSpots()}
            </div>

          </div>

          <button
            type="submit"
            className="create-party-button"
          >
            Create
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