import React from "react";
import { Link } from "react-router-dom";
import './Game.css';
import config from '../../config';

export default function Game(props) {
  let data = props.props;
  return (
    <li className='game-item-container'>
      <Link to={`/games/${data.id}`}>
      <div className='game-img'>
        <img src={`${config.IMAGES_ENDPOINT}/${data.id}/Main-Image.png`} alt="Game Cover" />
      </div>
        <h3>{data.title}</h3>
      </Link>
      <p>{data.party_count} {data.party_count !== 1 ? 'Squads' : 'Squad'}</p>
      <div className="game-tags-container">
        {data.tags.map((tag, i) => {
          return <span className='small-detail' key={i}>{tag}</span>;
        })}
      </div>
    </li>
  )
}

