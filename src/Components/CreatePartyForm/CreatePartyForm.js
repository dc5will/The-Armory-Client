import React, { useState, useContext, useEffect } from "react";
import SpotInput from "./SpotInput/SpotInput";
import GameContext from '../../Contexts/gameContext';
import config from "../../config";
import TokenService from "../../services/token-service";
import Dropdown from '../Dropdown/Dropdown';

export default function CreatePartyForm(props) {
  const gameContext = useContext(GameContext);
  //inputs
  const [partyName, setPartyname] = useState("");
  const [partyDescription, setPartyDescription] = useState('');
  const [partyRequirement, setPartyRequirement] = useState(undefined);
  const [partyRequirement2, setPartyRequirement2] = useState(undefined);
  const [partyGamemode, setPartyGamemode] = useState(0);
  //spots
  const [spotMenuShown, setSpotMenuShown] = useState(undefined);
  const [spotsObj, setSpotsObj] = useState({});

  useEffect(() => {
    let temp = {};
    let blankSpot = {
      filled: null,
      roles: [],
      omitted: false,
      showOptions: false,
    };
    //we don't include the first one as a spot-input since the owner will always be included
    for (let i = 1; i < gameContext.partyLimit; i++) {
      temp[i] = blankSpot;
    }
    setSpotsObj(temp);
  }, []);

  function getActiveValues(target) {
    const spots = [];
    Object.entries(spotsObj).forEach(([_, value]) => {
      !value.omitted && spots.push(
        {
          filled: value.filled,
          roles: value.roles,
        }
      );
    });
    let gamemode = target.querySelector('button[name=gamemode]');
    gamemode ? (gamemode = gamemode.dataset.value) : (gamemode = 0);

    const [req, req2] = target.querySelectorAll('button[name=requirements]');
    const reqs = [];
    req && reqs.push(req.dataset.value);
    req2 && reqs.push(req2.dataset.value);

    return {
      room_id: props.roomUrl,
      party: {
        game_id: gameContext.id,
        title: partyName,
        description: partyDescription,
        gamemode: parseInt(gamemode),
        require_app: false,
      },
      spots,
      requirement: reqs,
    };
  }


  function onPartyCreate(e) {
    e.preventDefault();
    const newParty = getActiveValues(e.target);
    fetch(
        `${config.API_ENDPOINT}/parties`, 
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${TokenService.getAuthToken()}`,
            'content-type': 'application/json'
          },
          body: JSON.stringify(newParty),
        }
      )
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then((respJson) => {
        props.history.push(`/party/${respJson}`);
      })
      .catch(err => {
        //UPDATE TO DISPLAY ERROR
        gameContext.setError(err);
      });
  }

  //SPOT HANDLERS
  function toggleSpotOptionsMenu(index) {
    (spotMenuShown === index)
      ? setSpotMenuShown(undefined)
      : setSpotMenuShown(index);
  }

  function toggleOmitSpot(index) {
    let newSpotsObj = {...spotsObj};
    newSpotsObj[index] = {
      ...newSpotsObj[index], 
      omitted: !newSpotsObj[index].omitted, 
      roles: [] 
    };
    setSpotsObj(newSpotsObj);
  }

  function handleSpotSubmit(index, roles) {
    let newSpotsObj = {...spotsObj};
    let newObj = {...newSpotsObj[index]};

    newObj.omitted = false;
    newObj.roles = roles;

    newSpotsObj[index] = newObj;
    setSpotsObj(newSpotsObj);
  }

  function generateSpotInputs() {
    let temp = [];
    let tempOmitted = [];

    Object.entries(spotsObj).forEach(([key, value]) => {
      let tempSpot = (
        <SpotInput
          key={key}
          index={key}
          omitted={value.omitted}
          toggleOmitSpot={toggleOmitSpot}
          toggleSpotOptionsMenu={toggleSpotOptionsMenu}
          showOptions={key === spotMenuShown}
          roles={value.roles}
          handleSpotSubmit={handleSpotSubmit}
        />
      );
      (value.omitted)
        ? tempOmitted.push(tempSpot)
        : temp.push(tempSpot);
    });

    return temp.concat(tempOmitted);
  }

  function getPartyRequirement2Options() {
    let temp = {...gameContext.requirements};
    delete temp[partyRequirement];

    return temp;
  }

  function handleReset(e) {
    setPartyname('');
    setPartyDescription('');
    setPartyRequirement(undefined);
    setPartyRequirement2(undefined);
    setPartyGamemode(0);
    const newSpotsObj = {...spotsObj};
    Object.keys(newSpotsObj).forEach(key => {
      newSpotsObj[key] = {...newSpotsObj[key], roles: [], omitted: false };
    });
    setSpotsObj(newSpotsObj);
    setSpotMenuShown(undefined);
  }

  return (
    <form className="create-party-form" onSubmit={onPartyCreate}>
      <h2>Create Party</h2>

        <div className="input-field">
          <label>Party Name
            <input
              type="text"
              placeholder="party"
              value={partyName}
              required
              onChange={e => setPartyname(e.target.value)}
            />
          </label>

          <label>Description
            <textarea
              id="party-description-input"
              type="text"
              maxLength='140'
              placeholder="limit 140 chars"
              value={partyDescription}
              onChange={e => setPartyDescription(e.target.value)}
            />
          </label>

          <fieldset className="create-party-form__filters">
            <legend>Requirements</legend>
            <Dropdown
              active={partyRequirement}
              name="requirements"
              onChange={e => setPartyRequirement(e.value)}
              onButtonClick={e => {
                if (partyRequirement2) {
                  setPartyRequirement(partyRequirement2);
                  setPartyRequirement2(undefined);
                } else {
                  setPartyRequirement(undefined);
                }
              }}
              startValue={partyRequirement}
              options={{...gameContext.requirements}}
            />
            <Dropdown
              active={partyRequirement2}
              inactive={!partyRequirement}
              onChange={e => setPartyRequirement2(e.value)}
              onButtonClick={() => setPartyRequirement2(undefined)}
              name="requirements"
              placeholder='Select a requirement...'
              startValue={partyRequirement2}
              options={getPartyRequirement2Options()}
            />
          </fieldset>
          <fieldset className="create-party-form__filters">
            <legend>Gamemode</legend>
            <Dropdown 
              active={partyGamemode}
              onChange={e => setPartyGamemode(e.value)}
              onButtonClick={() => setPartyGamemode(0)}
              startValue={partyGamemode}
              name="gamemode"
              gameId={gameContext.id}
              options={{...gameContext.gamemodes}}
            />
          </fieldset>
        </div>

        <div className='spot-container'>
          <div className="spot_input">Owner Spot</div>
          {generateSpotInputs()}
        </div>
        
        <button
          type="reset"
          className="create-party-reset-button"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type="submit"
          className="create-party-button"
        >
          Create Party
        </button>
        <button
          aria-label="cancel"
          className="create-party-cancel-button"
          onClick={props.toggleCreatePartyForm}
        >
          Cancel
        </button>
    </form>
  );
}