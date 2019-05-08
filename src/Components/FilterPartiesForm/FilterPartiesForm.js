import React, { useState, useContext } from 'react';
import GameContext from '../../Contexts/gameContext';
import Dropdown from '../Dropdown/Dropdown';
import './FilterPartiesForm.css'

export default function FilterPartyForm() {
  const gameContext = useContext(GameContext);
  const { requirements, roles, setFilters, resetFilters } = gameContext;
  const [searchTerm, setSearchTerm] = useState('');
  const [requirementFilter, setRequirementFilter] = useState(undefined);
  const [requirementFilter2, setRequirementFilter2] = useState(undefined);
  const [roleFilter, setRoleFilter] = useState(undefined);
  const [roleFilter2, setRoleFilter2] = useState(undefined);

  async function handleFilterSubmit(target) {
    const reqNodes = target.querySelectorAll('button[name=requirements]');
    let reqs = [];
    reqNodes.forEach(node => reqs.push(node.dataset.value));

    const roleNodes = target.querySelectorAll('button[name=roles]');
    let roles = [];
    roleNodes.forEach(node => roles.push(node.dataset.value));

    const searchTerm = target.querySelector('input').value;

    setFilters(searchTerm, reqs, roles);
  }
  
  function handleReset(e) {
    e.preventDefault();

    //check for differences, then update if changes found
    //controlled inputs
    searchTerm && setSearchTerm('');
    requirementFilter && setRequirementFilter(undefined);
    requirementFilter2 && setRequirementFilter2(undefined);
    roleFilter && setRoleFilter(undefined);
    roleFilter && setRoleFilter2(undefined);
    //context (live filters)
    resetFilters();
  }
  
  function handleFilterSubmitClick(e) {
    e.preventDefault();
    handleFilterSubmit(e.target);
  }

  function handleSearchChange(e) {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  function generateRequirementFilterDropdown() {
    let temp = [];
    let options = {...requirements};

    temp.push(
      <Dropdown
        key={0}
        name="requirements"
        active={requirementFilter}
        onChange={e => setRequirementFilter(e.value)}
        onButtonClick={e => 
          {
            if (requirementFilter2) {
              setRequirementFilter(requirementFilter2);
              setRequirementFilter2(undefined)
            } else {
              setRequirementFilter(undefined); 
            }
          }
        }
        startValue={requirementFilter}
        placeholder='Select a requirement...'
        options={options}
      />
    );

    let tempOptions2 = {...options};
    delete tempOptions2[requirementFilter];

    temp.push(
      <Dropdown
        key={1}
        name="requirements"
        active={requirementFilter2}
        inactive={!requirementFilter}
        onChange={e => setRequirementFilter2(e.value)}
        onButtonClick={e => setRequirementFilter2(undefined)}
        startValue={requirementFilter2}
        placeholder='Select a requirement...'
        options={tempOptions2}
      />
    );

    return temp;
  }

  function generateRoleFilterDropdown() {
    let temp = [];
    let options = {...roles};

    temp.push(
      <Dropdown
        key={0}
        name="roles"
        active={roleFilter}
        gameId={gameContext.id}
        onChange={e => setRoleFilter(e.value)}
        onButtonClick={e => 
          {
            if (roleFilter2) {
              setRoleFilter(roleFilter2);
              setRoleFilter2(undefined)
            } else {
              setRoleFilter(undefined); 
            }
          }
        }
        startValue={roleFilter}
        placeholder='Select a role...'
        options={options}
      />
    );

    let tempOptions2 = {...options};
    delete tempOptions2[roleFilter];

    temp.push(
      <Dropdown
        key={1}
        name="roles"
        active={roleFilter2}
        inactive={!roleFilter}
        gameId={gameContext.id}
        onChange={e => setRoleFilter2(e.value)}
        onButtonClick={e => setRoleFilter2(undefined)}
        placeholder='Select a role...'
        startValue={roleFilter2}
        options={tempOptions2}
      />
    );

    return temp;
  }

  return (  
    <form className="squads-filters" onSubmit={handleFilterSubmitClick}>
      <fieldset className="squads-filters__fieldset">
        <legend>Search</legend>
        <label className="input-with-icon">
          <i className="fas fa-search relative-fieldset-icon"/>
          <input className="solo-input-transitions" type="text" onChange={handleSearchChange} placeholder="Search by name or description" value={searchTerm} maxLength="72"/>
        </label>
      </fieldset>
      <fieldset className="squads-filters__fieldset">
        <legend>Requirements</legend>
        {generateRequirementFilterDropdown()}
      </fieldset>
      <fieldset className="squads-filters__fieldset">
        <legend>Roles</legend>
        {generateRoleFilterDropdown()}
      </fieldset>
      <div className="squads-filters-buttons-container">
        <button className="green-button" type="submit">Filter Squads</button>
        <button className="grey-button" type="reset" onClick={handleReset}>Reset Filters</button>
      </div>
    </form>
  );
}