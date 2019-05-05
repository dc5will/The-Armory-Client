import React from 'react';
import './Dropdown.css';

export default function Dropdown(props) {
  if (props.inactive) {
    return <div className="inactive-dropdown"/>
  }

  function generateOptions() {
    return Object.entries(props.options).map(([key, value]) => {
      return <option key={key} value={key}>{value.name}</option>
    });
  }

  let temp = (
    <select value={props.startValue} onChange={props.onChange}>
      {generateOptions()}
    </select>
  );


  if (props.active) {
    return (
      <button name={props.name} data-value={props.active} type="button" onClick={props.onButtonClick}>
        {props.options[props.active].name}
        <span> X</span>
      </button>
    );
  }

  return (props.label)
    ? (
        <label>{props.label}
          {temp}
        </label>
      )
    : (temp);
}
