import React, { useState, useContext, useEffect } from "react";
import SpotInput from "./SpotInput/SpotInput";
import GameContext from '../../Contexts/gameContext';
import config from "../../config";
import TokenService from "../../services/token-service";
import Dropdown from '../Dropdown/Dropdown';
import SpotInputFieldset from './SpotInput/SpotInputFieldset';
import './CreatePartyForm.css';
import useModal from '../Modal/useModal';
import Modal from "../Modal/Modal";

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

  const { isShowing, toggle } = useModal();

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
    let gamemode = 0;
    partyGamemode && (gamemode = partyGamemode)

    const reqs = [];
    partyRequirement && reqs.push(partyRequirement);
    partyRequirement2 && reqs.push(partyRequirement2);

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


  async function onPartyCreate(e) {
    e.preventDefault();
    const newParty = getActiveValues(e.target);
    await fetch(
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
        console.log(respJson);
        props.history.push(`/party/${respJson}`);
      })
      .catch(err => {
        //UPDATE TO DISPLAY ERROR
        gameContext.setError(err);
      });
  }

  //SPOT HANDLERS
  function toggleSpotOptionsMenu(index) {
    setSpotMenuShown(index);
    toggle();
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
          roles={value.roles}
          toggleSpotOptionsMenu={toggleSpotOptionsMenu}
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
      <h2 className="modal-header">Create Party</h2>
      <fieldset className="create-squad__fieldset">
        <legend>Details</legend>
        <input
          className="create-squad__name-input"
          aria-label="Party Name"
          type="text"
          placeholder="Enter a title..."
          value={partyName}
          required
          onChange={e => setPartyname(e.target.value)}
        />
        <textarea
          className="create-squad__description-input"
          aria-label="Description"
          type="text"
          maxLength='140'
          placeholder="Enter a description... (limit 140char)"
          value={partyDescription}
          onChange={e => setPartyDescription(e.target.value)}
        />
      </fieldset>

      <div className="create-squad__half-fieldset-container">
        <fieldset className="create-squad__fieldset create-squad__half-fieldset">
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
        <fieldset className="create-squad__fieldset create-squad__half-fieldset">
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
      <fieldset className="create-squad__fieldset">
        <legend>Spots</legend>
        <ul className='spot-container'>
          <li className="spot-input__owner spot-input__image-container">
            <i className="spot-input__spot-empty fas fa-users"/>
            <i className="spot-input__spots-filled fas fa-check"/>
          </li>
          {generateSpotInputs()}
        </ul>
      </fieldset>
      <div className="modal-button-holder create-squad__button-container">
        <div className="create-squad__button-subcontainer">
          <button
            type="submit"
            className="create-party-button green-button"
            onClick={onPartyCreate}
          >
            Create Party
          </button>
          <button
            type="reset"
            className="create-party-reset-button grey-button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <button
          aria-label="cancel"
          className="create-party-cancel-button grey-button"
          onClick={props.toggleCreatePartyForm}
        >
          Cancel
        </button>
      </div>
      <Modal
        isShowing={isShowing}
        noDisableScrolling={true}
        hide={toggle}
        content={
          (spotMenuShown)
          ? <SpotInputFieldset
              index={spotMenuShown}
              omitted={spotsObj[spotMenuShown].omitted}
              toggleOmitSpot={toggleOmitSpot}
              toggleSpotOptionsMenu={toggleSpotOptionsMenu}
              roles={spotsObj[spotMenuShown].roles}
              handleSpotSubmit={handleSpotSubmit}
            />
          : null
        }
      />

    </form>
  );
}