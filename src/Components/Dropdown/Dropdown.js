import React from 'react';
import './Dropdown.css';
import Select from 'react-select';
import config from '../../config';
import { callbackify } from 'util';

export default function Dropdown(props) {
  if (props.inactive) {
    return <div className="inactive-dropdown"/>
  }

  const options = Object.entries(props.options).map(([key, value]) => {
    return { 
      value: key, 
      label: (value.icon_url 
        ? <span className="drop-image-container"><img className="dropdown-image" src={`${config.IMAGES_ENDPOINT}/${props.gameId}/${value.icon_url}`} alt=""/>{value.name}</span> 
        : value.name)
    };
  });
  
  const customStyles = {
    control: () => ({}),
    menu: () => ({}),
    option: () => ({})
  }

  let temp = (
    <Select 
      className={props.className}
      classNamePrefix='r-dropdown'
      placeholder={props.placeholder}
      styles={customStyles}
      isSearchable={false}
      value={props.startValue}
      onChange={props.onChange}
      options={options}
    />
  );


  if (props.active) {
    return (
      <button className="dropdown-result-button" name={props.name} data-value={props.active} type="button" onClick={props.onButtonClick}>
        {(props.options[props.active].icon_url 
          ? <span className="drop-image-container"><img className="dropdown-image" src={`${config.IMAGES_ENDPOINT}/${props.gameId}/${props.options[props.active].icon_url}`} alt=""/>{props.options[props.active].name}</span> 
          : props.options[props.active].name)}
        <i className="fas fa-times"/>
      </button>
    );
  }

  return (props.label)
    ? (
        <div className="dropdown">
          <label>{props.label}
            {temp}
          </label>
        </div>
      )
    : (
        <div className="dropdown">
          {temp}
        </div>
      );
}
