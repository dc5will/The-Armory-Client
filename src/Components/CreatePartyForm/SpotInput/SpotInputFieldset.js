import React, { useState, useContext, useEffect } from "react";
import GameContext from '../../../Contexts/gameContext';
import './SpotInput.css';
import Dropdown from '../../Dropdown/Dropdown';

export default function SpotInput(props) {
  const { roles, id } = useContext(GameContext);

  const [role, setRole] = useState('');
  const [role2, setRole2] = useState('');

  useEffect(() => {
    props.roles[0] && setRole(props.roles[0]);
    props.roles[1] && setRole2(props.roles[1]);
  }, []);

  function getRole2Options() {
    let temp = {...roles};
    delete temp[role];

    return temp;
  }

  const handleRole1Reset = (e) => {
    e.preventDefault();
    if (role2) {
      setRole(role2);
      setRole2(undefined);
    } else {
      setRole(undefined);
    }
  }
  function handleCancel(e) {
    e.preventDefault();
    setRole(props.roles[0] || '');
    setRole2(props.roles[1] || '');
    props.toggleSpotOptionsMenu(props.index);
  }

  function handleSpotSubmit(e) {
    e.preventDefault();
    let target = e.target.parentElement.querySelectorAll('button[name=roles]');

    let [tar, tar2] = target;
    let temp = [];
    (tar) && temp.push(tar.dataset.value);
    (tar2) && temp.push(tar2.dataset.value);

    props.handleSpotSubmit(props.index, temp);
    props.toggleSpotOptionsMenu(props.index);
  }

  function handleOmitSpot() {
    setRole('');
    setRole2('');
    props.toggleOmitSpot(props.index);
    props.toggleSpotOptionsMenu(props.index);
  }


  return (
    <fieldset className="show_input_options">
      <h4>Squad Member {props.index}</h4>

      {!props.omitted && <button type="button" onClick={handleOmitSpot}>Omit</button>}

      <Dropdown
        name='roles'
        onChange={e => setRole(e.value)}
        onButtonClick={handleRole1Reset}
        active={role}
        gameId={id}
        startValue={role}
        options={{...roles}}
      />
      <Dropdown 
        name='roles'
        active={role2}
        inactive={!role}
        gameId={id}
        onChange={e => setRole2(e.value)}
        onButtonClick={() => setRole2(undefined)}
        startValue={role2}
        options={getRole2Options()}
      />

      <button type="submit" onClick={handleSpotSubmit}>Confirm</button>
      <button type="reset" onClick={handleCancel}>Cancel</button>
    </fieldset>
  );
}
