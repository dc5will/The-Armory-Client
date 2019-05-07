import React from "react";
import { Link } from "react-router-dom";

export default function Game(props) {
  let data = props.props;
  // console.log(data.title)
  return (
    <div className='game-item-container'>
    <Link to={`/games/${data.id}`}>
      <img src={data.image_url} alt="Game Cover" />
      <h3>{data.title}</h3>
    </Link>
    {data.tags.map((tag, i) => {
      return <span key={i}>{tag} | </span>;
    })}
    <p>Available Parties: {data.party_count}</p>
  </div>
  )
}

