import React, { useState, useContext } from 'react';
import GameContext from '../../Contexts/gameContext';
import Dropdown from '../Dropdown/Dropdown';


export default function FilterPartyForm() {
  const { gamemodes, requirements, roles, gamemodeFilter, setFilters, resetFilters, setGamemodeFilter } = useContext(GameContext);
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

  function generateGamemodeCheckboxes() {
    function onClick(e) {
      const { value } = e.target.dataset;
      setGamemodeFilter(value);
    }

    let temp = {0: { name: 'All', icon_url: ''}, ...gamemodes}
    return Object.entries(temp).map(([key, value]) => {
      if (key == gamemodeFilter) {
        return <div key={key} className="gamemode-filter-selected">{value.name}</div>;
      }
      return <button key={key} type="submit" data-value={key} onClick={onClick}>{value.name}</button>;
    });
  }

  function generateRequirementFilterDropdown() {
    let temp = [];
    let options = {0: { name: 'Select a requirement...'}, ...requirements};

    temp.push(
      <Dropdown
        key={0}
        name="requirements"
        active={requirementFilter}
        onChange={e => setRequirementFilter(e.target.value)}
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
        // options={[[undefined, { classN 'All' }], ...Object.entries(context.game.gamemodes)]}
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
        onChange={e => setRequirementFilter2(e.target.value)}
        onButtonClick={e => setRequirementFilter2(undefined)}
        startValue={requirementFilter2}
        // options={[[undefined, { name: 'All' }], ...Object.entries(context.game.gamemodes)]}
        options={tempOptions2}
      />
    );

    return temp;
  }

  function generateRoleFilterDropdown() {
    let temp = [];
    let options = {0: { name: 'Select a role...'}, ...roles};

    temp.push(
      <Dropdown
        key={0}
        name="roles"
        active={roleFilter}
        onChange={e => setRoleFilter(e.target.value)}
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
        // options={[[undefined, { name: 'All' }], ...Object.entries(context.game.gamemodes)]}
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
        onChange={e => setRoleFilter2(e.target.value)}
        onButtonClick={e => setRoleFilter2(undefined)}
        startValue={roleFilter2}
        // options={[[undefined, { name: 'All' }], ...Object.entries(context.game.gamemodes)]}
        options={tempOptions2}
      />
    );

    return temp;
  }

  return (  
    <form className="parties-filters" onSubmit={handleFilterSubmitClick}>
      <h4>Search</h4>
      <hr/>
      <input type="text" onChange={handleSearchChange} value={searchTerm} maxLength="72"/>
      <div className="parties-filters">
        <h4>Requirements</h4>
        <hr/>
        {generateRequirementFilterDropdown()}
      </div>
      <div className="parties-filters">
        <h4>Roles</h4>
        <hr/>
        {generateRoleFilterDropdown()}
      </div>
      <hr/>
      <button type="submit">Filter Parties</button>
      <button type="reset" onClick={handleReset}>Reset Filters</button>
      <hr/>
      {generateGamemodeCheckboxes()}
      <hr/>
    </form>
  );
}